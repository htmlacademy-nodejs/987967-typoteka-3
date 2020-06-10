'use strict';

const {Router} = require(`express`);
const {createCategoryRouter} = require(`./create-category-router`);
const {createSearchRouter} = require(`./create-search-router`);
const {createPostRouter} = require(`./create-post-router`);

const createAPI = () => {
  const router = new Router();

  router.use(`/articles`, createPostRouter());
  router.use(`/categories`, createCategoryRouter());
  router.use(`/search`, createSearchRouter());

  return router;
};

module.exports = {
  createAPI
};
