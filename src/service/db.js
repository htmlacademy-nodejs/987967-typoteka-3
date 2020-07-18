'use strict';

const {Sequelize} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);
const models = require(`./models`);
const {User, Avatar, Password, PostCategory, Category, Comment, Post, Picture} = require(`./models`);

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

  async createUser({email, firstname, lastname, password, avatar, originalAvatar}) {
    const userData = {email, firstname, lastname};
    const avatarData = {name: avatar, originalName: originalAvatar};
    const passwordData = {password};

    userData.Avatar = avatarData;
    userData.Password = passwordData;

    return User.create(userData, {
      include: [Avatar, Password]
    });
  }

  async createPost({date, title, announce, text, picture, originalPicture, categoryIds}) {
    const postData = {
      date,
      title,
      announce,
      text,
      Picture: {
        name: picture,
        originalName: originalPicture,
      },
      PostCategories: categoryIds.map((it) => ({[`category_id`]: it}))
    };

    return Post.create(postData, {
      include: [Picture, PostCategory]
    });
  }

  async createCategories(categoryNames) {
    const categoryData = categoryNames.map((it) => ({name: it}));
    return Category.bulkCreate(categoryData);
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
    this.reset();
  }

  async close() {
    return this.sequelize.close();
  }
}

module.exports = {
  DB,
};
