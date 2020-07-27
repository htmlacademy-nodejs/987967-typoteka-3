'use strict';

const {Sequelize, Op} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);
const models = require(`./models`);
const {CategorySortType, PostSortType} = require(`./db-const`);
const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts, getCategories} = require(`./queries`);
const {User, Avatar, Password, PostCategory, Category, Comment, Post, Picture} = require(`./models`);
const {addPagination} = require(`../utils`);

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

  return {post, comments, postCategories, picture};
};

class DB {
  constructor() {
    this.sequelize = new Sequelize(DBNAME, ADMIN, PSW, {
      host: HOST,
      dialect: `postgres`
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

  async createPost({date, title, announce, text, picture, originalPicture, categoryIds}) {
    const postData = {
      date,
      title,
      announce,
      text,
      picture: picture ? {
        name: picture,
        originalName: originalPicture,
      } : null,
      categories: categoryIds.map((it) => ({[`category_id`]: it}))
    };

    return Post.create(postData, {
      include: [Post.Picture, Post.PostCategory]
    });
  }

  async createPosts(postData, users, categories) {
    const preparedData = postData.map((it) => preparePostData(it, users, categories));

    const posts = preparedData.map((it) => ({
      ...it.post,
      picture: it.picture,
      comments: it.comments,
      postCategories: it.postCategories,
    }));

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
    const [dbUsers, dbCategories] = await Promise.all([this.createUsers(users, {plain: true}), this.createCategories(categories, {plain: true})]);
    return this.createPosts(posts, dbUsers, dbCategories);
  }

  async getCategoryPosts(categoryId, limit, offset) {
    const [countResponse, posts] = await Promise.all([
      PostCategory.findAll({
        attributes: [this.sequelize.fn(`COUNT`, this.sequelize.col(`post_id`))],
        include: [{
          association: PostCategory.Category,
          attributes: [`name`]
        }],
        group: [`category_id`, `category.name`],
        where: {
          [`category_id`]: categoryId,
        },
        raw: true,
      }),
      getCategoryPosts(this.sequelize, categoryId, limit, offset, PostSortType.BY_DATE),
    ]);

    if (countResponse.length !== 1) {
      throw new Error(`Category ID: "${categoryId}" must exist and be unique`);
    }

    return {
      [`category_name`]: countResponse[0][`category.name`],
      total: countResponse[0].count,
      posts
    };
  }

  async getCategories(excludeNoPost) {
    return getCategories(this.sequelize, excludeNoPost);
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
        `text`
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
        attributes: [`name`]
      }],
      where: {id},
      order: [[Post.Comment, `date`, `ASC`]]
    };

    const posts = await Post.findAll(query);
    return posts.length ? posts[0] : null;
  }

  async getPosts(sortType, limit, offset) {
    let queryPromise;

    switch (sortType) {
      case PostSortType.BY_DATE:
        queryPromise = getPostsSortedByDate(this.sequelize, limit, offset);
        break;

      case PostSortType.BY_POPULARITY:
      default:
        queryPromise = getPostsSortedByPopularity(this.sequelize, limit, offset);
    }

    const [posts, total] = await Promise.all([queryPromise, Post.count()]);

    return {
      posts,
      total
    };
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

  async deleteComment(id) {
    return Comment.destroy({
      where: {id}
    });
  }

  async deleteCategory(id) {
    return Category.destroy({
      where: {id}
    });
  }

  async updateCategory(id, name) {
    return Category.update({name}, {
      where: {id}
    });
  }
}

module.exports = {
  DB,
};
