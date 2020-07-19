'use strict';

const {Router} = require(`express`);
const {createCategoryRouter} = require(`./create-category-router`);
const {createSearchRouter} = require(`./create-search-router`);
const {createPostRouter} = require(`./create-post-router`);

const createAPI = (db) => {
  const router = new Router();

  router.use(`/articles`, createPostRouter(db));
  router.use(`/categories`, createCategoryRouter(db));
  router.use(`/search`, createSearchRouter(db));

  return router;
};

module.exports = {
  createAPI
};
