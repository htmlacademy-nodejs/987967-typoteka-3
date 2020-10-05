'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const {DataServer} = require(`../data-server`);
const {getPagination, render, reduceText} = require(`../utils`);
const {validateQuerySchema} = require(`../middlewares`);
const {
  POST_PREVIEW_COUNT,
  RECENT_COMMENT_COUNT,
  POPULAR_POST_COUNT,
  ANNOUNCE_PREVIEW_LENGTH,
  COMMENT_PREVIEW_LENGTH,
  PostSortType,
} = require(`../const`);

const mainRouter = new Router();
const dataServer = new DataServer();

const validatePagination = async (req, res, next) => {
  const {postCount} = res.locals;
  const pageCount = Math.ceil(Number(postCount) / POST_PREVIEW_COUNT);

  const querySchema = Joi.object({
    page: Joi.number().min(1).max(pageCount).optional(),
  });

  await validateQuerySchema(querySchema, `400`)(req, res, next);
};

const getPopularPosts = async (req, res, next) => {
  try {
    const {posts, postCount} = await dataServer.getPostPreviews(PostSortType.POPULARITY, POPULAR_POST_COUNT, 0);
    res.locals.postCount = postCount;
    res.locals.popularPosts = posts;
    next();
  } catch (err) {
    next(err);
  }
};

mainRouter.get(`/`, getPopularPosts, validatePagination, async (req, res, next) => {
  try {
    const {popularPosts, postCount} = res.locals;
    const pageCount = Math.ceil(Number(postCount) / POST_PREVIEW_COUNT);

    const page = Number(req.query.page) || 1;

    const [categories, {posts}, comments] = await Promise.all([
      dataServer.getCategories(true),
      dataServer.getPostPreviews(PostSortType.DATE, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT),
      dataServer.getComments(RECENT_COMMENT_COUNT, 0),
    ]);

    const renderData = {
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
    };

    render(`main`, renderData, req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  mainRouter,
};
