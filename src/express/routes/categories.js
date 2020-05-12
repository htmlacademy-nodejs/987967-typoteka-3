'use strict';

const { Router } = require(`express`);

const categoryRouter = new Router();

categoryRouter.get(`/`, (req, res, next) => {
  res.send(`/categories`);
  next()
});

module.exports = {
  categoryRouter,
}