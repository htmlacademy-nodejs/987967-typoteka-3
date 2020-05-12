'use strict';

const {Router} = require(`express`);

const articleRouter = new Router();

articleRouter.get(`/:id`, (req, res, next) => {
  res.send(`/articles/${req.params.id}`);
  next();
});

articleRouter.get(`/category/:id`, (req, res, next) => {
  res.send(`/articles/category/${req.params.id}`);
  next();
});

articleRouter.get(`/add`, (req, res, next) => {
  res.send(`/articles/add${req.params.id}`);
  next();
});

articleRouter.get(`/edit/:id`, (req, res, next) => {
  res.send(`/articles/edit/${req.params.id}`);
  next();
});

module.exports = {
  articleRouter,
};
