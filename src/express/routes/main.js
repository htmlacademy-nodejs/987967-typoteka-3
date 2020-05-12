'use strict';

const { Router } = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res, next) => {
  res.send(`/`);
  next()
});

module.exports = {
  mainRouter,
}