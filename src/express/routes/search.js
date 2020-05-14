'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res, next) => {
  res.send(`/search`);
  next();
});

module.exports = {
  searchRouter,
};
