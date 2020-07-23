'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {getLogger, LogMessage, LoggerName} = require(`../../logger`);
const {sortPostsByDate, sortPostsByPopular, sortCommentsByDate, collectComments} = require(`../../utils`);
const {
  ANNOUNCE_COUNT,
  LASTST_COMMENT_COUNT,
  POPULAR_POST_COUNT,
  ANNOUNCE_PREVIEW_LENGTH,
  COMMENT_PREVIEW_LENGTH,
  PostSortType,
} = require(`../const`);

const mainRouter = new Router();
const dataServer = new DataServer();
const logger = getLogger(LoggerName.FRONT_SERVER_API);

mainRouter.get(`/`, async (req, res, next) => {
  let categories;
  let popularPosts;
  let posts;
  let postCount;
  let comments;
  const page = Number(req.query.page) || 1;

  try {
    [categories, {posts: popularPosts}, {posts, postCount}, comments] = await Promise.all([
      dataServer.getCategories(),
      dataServer.getPostPreviews(PostSortType.POPULARITY, POPULAR_POST_COUNT, 0),
      dataServer.getPostPreviews(PostSortType.DATE, ANNOUNCE_COUNT, (page - 1) * ANNOUNCE_COUNT),
      dataServer.getComments(LASTST_COMMENT_COUNT, 0),
    ]);
  } catch (err) {
    logger.error(LogMessage.getEndRequest(req.url));
    next(err);
    return;
  }

  const pageCount = Math.ceil(Number(postCount) / ANNOUNCE_COUNT);

  res.render(`main`, {
    categories,
    posts,
    popularPosts,
    comments,
    pagination: {
      page,
      prev: page > 1 ? page - 1 : null,
      next: page < pageCount ? page + 1 : null,
      pageHref: req.path,
      pageCount,
    }
  });

  logger.info(LogMessage.getEndRequest(req.url));
});

module.exports = {
  mainRouter,
};
