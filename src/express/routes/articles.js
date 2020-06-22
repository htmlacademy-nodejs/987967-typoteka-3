'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE} = require(`../const`);
const {formatDate} = require(`../../utils`);

const articleRouter = new Router();
const dataServer = new DataServer();

articleRouter.get(`/add`, async (req, res) => {
  const categories = await dataServer.getCategories();
  const post = {
    dateLocalized: formatDate(new Date())
  };

  res.render(`new-post`, {
    title: NEW_POST_TITLE,
    post,
    categories,
  });
});

articleRouter.get(`/:id`, (req, res) => {
  res.render(`post`);
});

articleRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});

articleRouter.get(`/edit/:id`, async (req, res) => {
  const id = req.params.id;
  const [categories, post] = await Promise.all([dataServer.getCategories(), dataServer.getPost(id)]);

  res.render(`new-post`, {
    title: EDIT_POST_TITLE,
    post,
    categories: categories.map((category) => ({
      ...category,
      checked: Boolean(post.categories.find((it) => it.id === category.id))
    }))
  });
});

module.exports = {
  articleRouter,
};
