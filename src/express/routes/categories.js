'use strict';

const {Router} = require(`express`);

const categoryRouter = new Router();

categoryRouter.get(`/`, (req, res, next) => {
  res.render(`all-categories`);
  next();
});

module.exports = {
  categoryRouter,
};
