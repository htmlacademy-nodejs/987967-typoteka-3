'use strict';

const path = require(`path`);
const {Sequelize} = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);

const {generateCategories, generateUsers, generatePost, readContent} = require(`../utils`);
const {DataFileName, AVATAR_MOCK_FOLDER, PICTURE_MOCK_FOLDER} = require(`./const`);
const fs = require(`fs`);

const MODEL_FILES = [
  `avatar`,
  `user`,
  `password`,
  `picture`,
  `post`,
  `comment`,
  `category`,
  `post-category`
];

const importModels = (sequelize, modelFiles) => {
  modelFiles.forEach((it) => {
    require(path.join(__dirname, `./models/${it}`))(sequelize);
  });

  Object.values(sequelize.models).forEach((it) => {
    if (`associate` in it) {
      it.associate(sequelize.models);
    }
  });
};

const initDB = async () => {
  const sequelize = new Sequelize(DBNAME, ADMIN, PSW, {
    host: HOST,
    dialect: `postgres`
  });

  importModels(sequelize, MODEL_FILES);

  try {
    await sequelize.authenticate();
  } catch (err) {
    throw err;
  }

  return sequelize;
};

const resetDB = async (sequelize) => sequelize.sync({force: true});

const createUser = async (userModel, avatarModel, passwordModel, data) => {
  const avatar = await avatarModel.create({
    name: data.avatar,
    originalName: data.originalAvatar,
  });

  const user = await userModel.create({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    [`avatar_id`]: avatar.id,
  });

  await passwordModel.create({
    password: data.password,
    [`user_id`]: user.id,
  });

  return user;
};

const findUser = (users, email) => {
  const user = users.find((it) => it.email === email);
  if (!user) {
    throw new Error(`Unknown user: ${email}`);
  }

  return user;
};

const findCategory = (categories, name) => {
  const category = categories.find((it) => it.name === name);
  if (!category) {
    throw new Error(`Unknown category: ${name}`);
  }

  return category;
};

const createComments = async (commentModel, commentData, postId, users) => {
  return Promise.all(commentData.map((it) => {
    const user = findUser(users, it.user.email);
    return commentModel.create({
      [`user_id`]: user.id,
      [`post_id`]: postId,
      date: new Date(it.date),
      text: it.text
    });
  }));
};

const createPost = async (postModel, pictureModel, commentModel, postCategoryModel, postData, users, categories) => {
  const user = findUser(users, postData.user.email);

  const picture = postData.picture
    ? await pictureModel.create({
      name: postData.picture,
      originalName: postData.originalPicture,
    })
    : null;

  const post = await postModel.create({
    [`user_id`]: user.id,
    [`picture_id`]: picture ? picture.id : null,
    date: new Date(postData.createdDate),
    title: postData.title,
    announce: postData.announce,
    text: postData.fullText,
  });

  const commentPromises = createComments(commentModel, postData.comments, post.id, users);
  const postCategoriesPromises = postData.categories.map((it) => {
    const category = findCategory(categories, it.name);
    return postCategoryModel.create({
      [`post_id`]: post.id,
      [`category_id`]: category.id,
    });
  });

  return Promise.all([...commentPromises, ...postCategoriesPromises]);
};

const fillDB = async (sequelize, categoryData, userData, postData) => {
  const {Avatar, User, Password, Picture, Post, Category, Comment, PostCategory} = sequelize.models;

  const categories = await Promise.all(categoryData.map((it) => Category.create({name: it.name})));
  const users = await Promise.all(userData.map((it) => createUser(User, Avatar, Password, it)));
  return Promise.all(postData.map((it) => createPost(
      Post,
      Picture,
      Comment,
      PostCategory,
      it,
      users,
      categories
  )));
};

(async () => {
  let sequelize;

  const userCount = 3;
  const postCount = 10;

  const data = {
    titles: await readContent(`./data/${DataFileName.TITLE}`),
    sentences: await readContent(`./data/${DataFileName.DESCRIPTION}`),
    categories: await generateCategories(`./data/${DataFileName.CATEGORY}`),
    comments: await readContent(`./data/${DataFileName.COMMENT}`),
    names: await readContent(`./data/${DataFileName.NAME}`),
  };

  const pictures = await fs.promises.readdir(PICTURE_MOCK_FOLDER);
  const avatars = await fs.promises.readdir(AVATAR_MOCK_FOLDER);

  const users = generateUsers(userCount, data.names, avatars);
  const posts = new Array(postCount).fill(``).map(() => generatePost(data, users, pictures));

  try {
    sequelize = await initDB();
    await resetDB(sequelize);
    await fillDB(sequelize, data.categories, users, posts);
  } catch (err) {
    throw err;
  }

  sequelize.close();
})();

// module.exports = {
//   sequelize,
//   fillDB
// };
