'use strict';

const {Router} = require(`express`);

const articleRouter = new Router();

articleRouter.get(`/add`, (req, res, next) => {
  res.render(`new-post`); 
  next();
});

articleRouter.get(`/:id`, (req, res, next) => {
  res.render(`post`);
  next();
});  

articleRouter.get(`/category/:id`, (req, res, next) => {
  res.render(`articles-by-category`);
  next();
});  

articleRouter.get(`/edit/:id`, (req, res, next) => {
  res.send(`/articles/edit/${req.params.id}`);
  next();
});

module.exports = {
  articleRouter,
};
