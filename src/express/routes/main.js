'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res, next) => {
  res.render(`main`);
  next();
});

module.exports = {
  mainRouter,
};
