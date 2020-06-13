'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);

const mainRouter = new Router();
const dataServer = new DataServer();

mainRouter.get(`/`, async (req, res, next) => {
  let categories;
  try {
    categories = await dataServer.getCategories();
  } catch (err) {
    next(err);
    return;
  }

  res.render(`main`, {
    categories
  });
});

module.exports = {
  mainRouter,
};
