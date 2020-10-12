'use strict';

const {createUsers} = require(`./user-service`);
const {createCategories} = require(`./category-service`);
const {createPosts} = require(`./posts-service`);

const fillDatabase = async (sequelize, posts, users, categories) => {
  await sequelize.sync({force: true});

  const [dbUsers, dbCategories] = await Promise.all([
    createUsers(users),
    createCategories(categories)
  ]);

  const dbPosts = await createPosts(posts, dbUsers, dbCategories);

  return {
    userIDs: dbUsers.map((it) => it.id),
    categoryIDs: dbCategories.map((it) => it.id),
    postIDs: dbPosts.map((it) => it.id),
  };
};

module.exports = {
  fillDatabase,
};
