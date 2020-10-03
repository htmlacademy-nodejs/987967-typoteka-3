'use strict';

const {Sequelize, Op} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);
const models = require(`./models`);
const {PostSortType, UserRole} = require(`./const`);
const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts, getCategories, updatePicture} = require(`./queries`);
const {User, PostCategory, Category, Comment, Post} = require(`./models`);
const {getLimitConstrain, getHash, compareHash} = require(`./utils`);

const prepareUserData = async ({email, firstname, lastname, password, avatar, originalAvatar}) => {
  const userData = {email, firstname, lastname};
  const avatarData = {name: avatar, originalName: originalAvatar};
  const passwordData = {
    password: await getHash(password),
  };

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
      define: {
        timestamps: false,
      },
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
    data.password = {
      password: await getHash(data.password)
    };

    const user = await this._create(User, data, {
      include: [User.Avatar, User.Password],
    });

    return user.get({plain: true});
  }

  async createUsers(data) {
    const userData = await Promise.all(data.map((it) => prepareUserData(it)));

    return User.bulkCreate(userData, {
      include: [User.Avatar, User.Password]
    });
  }

  async createPost(post) {
    const postData = {
      ...post,
      postCategories: post.categories.map((it) => ({[`category_id`]: it}))
    };

    return this._create(Post, postData, {
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

  async fillDataBase(posts, users, categories, reset) {
    if (reset) {
      await this.reset();
    }

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
    return getCategoryPosts(this.sequelize, categoryId, limit, offset);
  }

  async getCategories(excludeNoPost) {
    return getCategories(this.sequelize, excludeNoPost);
  }

  async getAllCategories() {
    return (await Category.findAll({
      attributes: [`id`]
    })).map((it) => it.id);
  }

  async getCategoryByName(name) {
    return Category.findOne({
      where: {name}
    });
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
    const user = await User.findByPk(id);
    return user ? user.get({plain: true}) : null;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: {email}
    });

    return user ? user.get({plain: true}) : null;
  }

  async checkUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return {role: UserRole.UNAUTHORIZED};
    }

    const {id, lastname, firstname, avatar, password: passwordData} = (await User.findOne({
      attributes: [`id`, `firstname`, `lastname`],
      include: [{
        association: User.Avatar,
        attributes: [`name`]
      }, {
        association: User.Password,
      }],
      where: {email}
    })).get({plain: true});

    const passwordIsRight = await compareHash(password, passwordData.password);

    if (!passwordIsRight) {
      return {role: UserRole.UNAUTHORIZED};
    }

    return {
      id,
      firstname,
      lastname,
      email,
      avatar: avatar ? avatar.name : null,
      role: id === await this._getAdminId() ? UserRole.ADMIN : UserRole.READER
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
      ...getLimitConstrain(limit, offset)
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
        [`category_id`]: it,
        [`post_id`]: id,
      })), {transaction});

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
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

  async _create(model, data, options) {
    const transaction = await this.sequelize.transaction();
    const queryOptions = {
      ...options,
      transaction,
    };

    try {
      const result = await model.create(data, queryOptions);
      await transaction.commit();
      return result;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async _getAdminId() {
    if (!this.adminId) {
      this.adminId = (await User.findAll({
        attributes: [[this.sequelize.fn(`min`, this.sequelize.col(`id`)), `adminId`]],
      }))[0].get({plain: true}).adminId;
    }

    return this.adminId;
  }
}

module.exports = {
  DB,
};
