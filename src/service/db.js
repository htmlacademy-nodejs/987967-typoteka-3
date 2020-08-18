'use strict';

const {Sequelize, Op} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);
const models = require(`./models`);
const {PostSortType} = require(`./const`);
const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts, getCategories, updatePicture} = require(`./queries`);
const {User, PostCategory, Category, Comment, Post} = require(`./models`);
// const {addPagination} = require(`./utils`);

const addPagination = (limit, offset = 0) => {
  return limit ? {
    limit,
    offset
  } : {};
};


const prepareUserData = ({email, firstname, lastname, password, avatar, originalAvatar}) => {
  const userData = {email, firstname, lastname};
  const avatarData = {name: avatar, originalName: originalAvatar};
  const passwordData = {password};

  userData.avatar = avatarData;
  userData.password = passwordData;

  return userData;
};

const prepareCategoryData = ({name}, categories) => {
  const category = categories.find((it) => it.name === name);

  if (!category) {
    throw new Error(`Wrong mock data. Category "${name}" not found`);
  }

  return {[`category_id`]: category.id};
};

const prepareCommentData = ({text, date, user}, users) => {
  const commentUser = users.find((it) => it.email === user.email);

  if (!commentUser) {
    throw new Error(`Wrong mock data. User "${user.email}" not found`);
  }

  return {text, date, [`user_id`]: commentUser.id};
};

const preparePostData = ({title, date, announce, text, picture: pictureData, originalPicture, comments: commentData, categories}, dbUsers, dbCategories) => {
  const comments = commentData.map((it) => prepareCommentData(it, dbUsers));
  const postCategories = categories.map((it) => prepareCategoryData(it, dbCategories));
  const picture = pictureData ? {
    name: pictureData,
    originalName: originalPicture,
  } : null;

  const post = {
    title,
    date,
    announce,
    text
  };

  return {...post, comments, postCategories, picture};
};

class DB {
  constructor(dbName = DBNAME, admin = ADMIN, psw = PSW, silent) {
    this.sequelize = new Sequelize(dbName, admin, psw, {
      host: HOST,
      dialect: `postgres`,
      logging: silent ? false : console.log,
    });

    const modelList = Object.values(models);

    modelList.forEach((it) => {
      it.init(this.sequelize);
    });

    modelList.forEach((it) => {
      if (it.associate) {
        it.associate(models);
      }
    });
  }

  async authenticate() {
    return this.sequelize.authenticate();
  }

  async reset() {
    return this.sequelize.sync({force: true});
  }

  async createUser(data) {
    const userData = prepareUserData(data);

    return User.create(userData, {
      include: [User.Avatar, User.Password]
    });
  }

  async createUsers(data) {
    const userData = data.map((it) => prepareUserData(it));

    return User.bulkCreate(userData, {
      include: [User.Avatar, User.Password]
    });
  }

  async createPost(post) {
    const postData = {
      ...post,
      postCategories: post.categories.map((it) => ({[`category_id`]: it}))
    };

    return Post.create(postData, {
      include: [Post.Picture, Post.PostCategory]
    });
  }

  async createPosts(postData, users, categories) {
    const posts = postData.map((it) => preparePostData(it, users, categories));
    return Post.bulkCreate(posts, {
      include: [
        Post.Picture,
        Post.Comment,
        Post.PostCategory,
      ]
    });
  }

  async createCategory(name) {
    return (await Category.create({name})).get({plain: true});
  }

  async createCategories(categories) {
    return Category.bulkCreate(categories.map((it) => ({name: it.name})));
  }

  async createComment({text, date, userId, postId}) {
    return Comment.create({
      text,
      date,
      [`user_id`]: userId,
      [`post_id`]: postId,
    });
  }

  async createMockDB(posts, users, categories) {
    await this.reset();
    return this.fillMockDB(posts, users, categories);
  }

  async fillMockDB(posts, users, categories) {
    // require(`fs`).writeFileSync(`${process.cwd()}/posts.json`, JSON.stringify(posts));
    // require(`fs`).writeFileSync(`${process.cwd()}/users.json`, JSON.stringify(users));
    // require(`fs`).writeFileSync(`${process.cwd()}/categories.json`, JSON.stringify(categories));
    const [dbUsers, dbCategories] = await Promise.all([
      this.createUsers(users),
      this.createCategories(categories)
    ]);
    const dbPosts = await this.createPosts(posts, dbUsers, dbCategories);

    return {
      userIDs: dbUsers.map((it) => it.id),
      categoryIDs: dbCategories.map((it) => it.id),
      postIDs: dbPosts.map((it) => it.id),
    };
  }

  async getCategoryPosts(categoryId, limit, offset) {
    return getCategoryPosts(this.sequelize, categoryId, limit, offset, PostSortType.BY_DATE);
  }

  async getCategories(excludeNoPost) {
    return getCategories(this.sequelize, excludeNoPost);
  }

  async getAllCategories() {
    return (await Category.findAll({
      attributes: [`id`]
    })).map((it) => it.id);
  }

  async getCategory(id) {
    return Category.findByPk(id);
  }

  async getPost(id) {
    const query = {
      attributes: [
        `id`,
        `title`,
        `date`,
        `announce`,
        `text`,
      ],
      include: [{
        association: Post.Category,
        attributes: [`id`, `name`],
        through: {
          attributes: []
        },
      }, {
        association: Post.Comment,
        include: {
          association: Comment.User,
          include: {
            association: User.Avatar,
            attributes: [`name`]
          }
        },
      }, {
        association: Post.Picture,
        attributes: [`name`, `originalName`]
      }],
      where: {id},
      order: [[Post.Comment, `date`, `ASC`]]
    };

    return await Post.findOne(query);
  }

  async getPosts(sortType, limit, offset) {
    switch (sortType) {
      case PostSortType.BY_DATE:
        return getPostsSortedByDate(this.sequelize, limit, offset);

      case PostSortType.BY_POPULARITY:
      default:
        return getPostsSortedByPopularity(this.sequelize, limit, offset);
    }
  }

  async getUser(id) {
    return User.findByPk(id);
  }

  async getComment(id) {
    return Comment.findByPk(id);
  }

  async getComments(limit, offset) {
    const query = {
      attributes: [`id`, `date`, `text`],
      include: [{
        association: Comment.User,
        include: [{
          association: User.Avatar,
          attributes: [`name`]
        }]
      }, {
        association: Comment.Post,
        attributes: [`id`, `title`]
      }],
      order: [[`date`, `DESC`]],
      ...addPagination(limit, offset)
    };

    return Comment.findAll(query);
  }

  async close() {
    return this.sequelize.close();
  }

  async deletePost(id) {
    return Post.destroy({
      where: {id}
    });
  }

  async deletePosts(ids) {
    return Post.destroy({
      where: {id: ids}
    });
  }

  async deleteComment(id) {
    return Comment.destroy({
      where: {id}
    });
  }

  async deleteUser(id) {
    return User.destroy({
      where: {id}
    });
  }

  async deleteUsers(ids) {
    return User.destroy({
      where: {id: ids}
    });
  }

  async deleteCategory(id) {
    return Category.destroy({
      where: {id}
    });
  }

  async deleteCategories(ids) {
    return Category.destroy({
      where: {id: ids}
    });
  }

  async updateCategory(id, name) {
    return Category.update({name}, {
      where: {id}
    });
  }

  async updatePost(id, post) {
    const transaction = await this.sequelize.transaction();

    try {
      await Post.update(post, {
        where: {id},
        transaction
      });

      await updatePicture(id, post.picture, transaction);

      await PostCategory.destroy({
        where: {[`post_id`]: id},
        transaction
      });

      await PostCategory.bulkCreate(post.categories.map((it) => ({
        [`category_id`]: it.id,
        [`post_id`]: id,
      })), {transaction});

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }

  async search(query) {
    return Post.findAll({
      where: {
        title: {
          [Op.regexp]: query
        }
      }
    });
  }
}

module.exports = {
  DB,
};
