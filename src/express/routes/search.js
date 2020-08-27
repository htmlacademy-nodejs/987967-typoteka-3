'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const Joi = require(`joi`);
const {TitleLength} = require(`../const`);

const searchRouter = new Router();
const dataServer = new DataServer();

searchRouter.get(`/`, async (req, res, next) => {
  try {
    const querySchema = Joi.object({
      query: Joi.string().max(TitleLength.MAX).required()
    }).allow({});

    await querySchema.validateAsync(req.query);

    const queryString = req.query.query;
    const foundPosts = queryString ? await dataServer.search(queryString) : [];
    const markedPosts = foundPosts.map((it) => ({
      ...it,
      title: it.title.replace(RegExp(`(${queryString})`, `ig`), `<b>$1</b>`)
    }));

    res.render(`search`, {
      queryString,
      foundPosts: markedPosts,
    });
  } catch (err) {
    if (err.isJoi) {
      res.render(`400`);
      return;
    }

    next(err);
  }
});

module.exports = {
  searchRouter,
};
