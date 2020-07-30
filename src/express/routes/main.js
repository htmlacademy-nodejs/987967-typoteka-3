'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {getPagination} = require(`../utils`);
const {
  POST_PREVIEW_COUNT,
  LASTST_COMMENT_COUNT,
  POPULAR_POST_COUNT,
  ANNOUNCE_PREVIEW_LENGTH,
  COMMENT_PREVIEW_LENGTH,
  PostSortType,
} = require(`../const`);

const reduceText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const mainRouter = new Router();
const dataServer = new DataServer();

mainRouter.get(`/`, async (req, res, next) => {
  let categories;
  let popularPosts;
  let posts;
  let postCount;
  let comments;
  const page = Number(req.query.page) || 1;

  try {
    [categories, {posts: popularPosts}, {posts, postCount}, comments] = await Promise.all([
      dataServer.getCategories(true),
      dataServer.getPostPreviews(PostSortType.POPULARITY, POPULAR_POST_COUNT, 0),
      dataServer.getPostPreviews(PostSortType.DATE, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT),
      dataServer.getComments(LASTST_COMMENT_COUNT, 0),
    ]);
  } catch (err) {
    next(err);
    return;
  }

  const pageCount = Math.ceil(Number(postCount) / POST_PREVIEW_COUNT);

  res.render(`main`, {
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
});

module.exports = {
  mainRouter,
};
