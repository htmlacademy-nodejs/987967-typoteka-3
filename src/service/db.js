'use strict';

const {Sequelize} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);
const models = require(`./models`);
const {User, Avatar, Password, PostCategory, Category, Comment, Post, Picture} = require(`./models`);

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
      picture: {
        name: picture,
        originalName: originalPicture,
      },
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
      categories: it.postCategories,
    }));

    return Post.bulkCreate(posts, {
      include: [
        Post.Picture,
        Post.Comment,
        Post.PostCategory,
      ]
    });
  }

  async createCategories(categories) {
    return Category.bulkCreate(categories.map((it) => ({name: it.name})));
  }

  async createCategory(name) {
    return Category.create({name});
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

  async getCategories() {
    const categories = await PostCategory.findAll({
      attributes: [
        [this.sequelize.fn(`COUNT`, this.sequelize.col(`PostCategory.post_id`)), `count`]
      ],
      include: {
        association: PostCategory.Category,
        attributes: [`name`, `id`],
      },
      group: [`PostCategory.category_id`, `category.name`, `category.id`],
    });

    return categories.map((it) => {
      const category = it.get({plain: true});
      return {count: category.count, ...category.category};
    });
  }

  async close() {
    return this.sequelize.close();
  }
}

module.exports = {
  DB,
};
