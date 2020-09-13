'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const Joi = require(`joi`);
const {TitleLength} = require(`../const`);
const {validateQuerySchema} = require(`../middlewares`);

const searchRouter = new Router();
const dataServer = new DataServer();

const querySchema = Joi.object({
  query: Joi.string().max(TitleLength.MAX).required()
}).allow({});

searchRouter.get(`/`, validateQuerySchema(querySchema, `search`), async (req, res, next) => {
  try {
    const {user} = req.session;

    const queryString = req.query.query;
    const foundPosts = queryString ? await dataServer.search(queryString) : [];
    const markedPosts = foundPosts.map((it) => ({
      ...it,
      title: it.title.replace(RegExp(`(${queryString})`, `ig`), `<b>$1</b>`)
    }));

    res.render(`search`, {
      user,
      queryString,
      foundPosts: markedPosts,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  searchRouter,
};
