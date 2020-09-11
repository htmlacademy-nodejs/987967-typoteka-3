'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {getPagination} = require(`../utils`);
const {getCategories} = require(`../middlewares`);
const {
  POST_PREVIEW_COUNT,
  LASTST_COMMENT_COUNT,
  POPULAR_POST_COUNT,
  ANNOUNCE_PREVIEW_LENGTH,
  COMMENT_PREVIEW_LENGTH,
  PostSortType,
} = require(`../const`);
const Joi = require(`joi`);

const reduceText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const mainRouter = new Router();
const dataServer = new DataServer();

mainRouter.get(`/`, async (req, res, next) => {
  try {
    const {posts: popularPosts, postCount} = await dataServer.getPostPreviews(PostSortType.POPULARITY, POPULAR_POST_COUNT, 0);
    const pageCount = Math.ceil(Number(postCount) / POST_PREVIEW_COUNT);
    const pageSchema = Joi.object({
      page: Joi.number().min(1).max(pageCount).optional()
    });

    await pageSchema.validateAsync(req.query);
    const page = Number(req.query.page) || 1;

    const [categories, {posts}, comments] = await Promise.all([
      dataServer.getCategories(true),
      dataServer.getPostPreviews(PostSortType.DATE, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT),
      dataServer.getComments(LASTST_COMMENT_COUNT, 0),
    ]);

    console.log(req.session.user);
    res.render(`main`, {
      user: req.session.user,
      categories,
      posts,
      popularPosts: popularPosts.filter((it) => it[`comment_count`] > 0).map((it) => ({
        ...it,
        announce: reduceText(it.announce, ANNOUNCE_PREVIEW_LENGTH),
      })),

      comments: comments.map((it) => ({
        ...it,
        text: reduceText(it.text, COMMENT_PREVIEW_LENGTH),
      })),

      pagination: getPagination(page, pageCount, req.path),
    });
  } catch (err) {
    if (err.isJoi) {
      res.render(`400`);
      return;
    }

    next(err);
    return;
  }
});

module.exports = {
  mainRouter,
};
