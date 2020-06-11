'use strict';

const {Router} = require(`express`);
const {DataService} = require(`../data-service`);
const {getMockPosts} = require(`../../utils`);
const {createCategoryRouter} = require(`./create-category-router`);
const {createSearchRouter} = require(`./create-search-router`);
const {createPostRouter} = require(`./create-post-router`);

const createAPI = async () => {
  const dataService = new DataService(await getMockPosts());
  const router = new Router();

  router.use(`/articles`, createPostRouter(dataService));
  router.use(`/categories`, createCategoryRouter(dataService));
  router.use(`/search`, createSearchRouter(dataService));

  return router;
};

module.exports = {
  createAPI
};
