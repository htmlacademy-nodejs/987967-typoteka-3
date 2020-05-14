'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res, next) => {
  res.render(`search`);
  next();
});

module.exports = {
  searchRouter,
};
