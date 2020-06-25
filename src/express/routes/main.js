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
  COMMENT_PREVIEW_LENGTH
} = require(`../const`);

const mainRouter = new Router();
const dataServer = new DataServer();
const logger = getLogger(LoggerName.FRONT_SERVER_API);

mainRouter.get(`/`, async (req, res, next) => {
  let categories;
  let postPreviews;
  try {
    [categories, postPreviews] = await Promise.all([dataServer.getCategories(), dataServer.getPostPreviews()]);
  } catch (err) {
    logger.error(LogMessage.getEndRequest(req.url));
    next(err);
    return;
  }

  const posts = sortPostsByDate(postPreviews).slice(0, ANNOUNCE_COUNT);
  const popularPosts = sortPostsByPopular(postPreviews).slice(0, POPULAR_POST_COUNT).map((it) => ({
    ...it,
    announce: `${it.announce.slice(0, ANNOUNCE_PREVIEW_LENGTH)}...`
  }));

  const comments = collectComments(postPreviews);
  const laststComments = sortCommentsByDate(comments).slice(0, LASTST_COMMENT_COUNT).map((it) => ({
    ...it,
    text: `${it.text.slice(0, COMMENT_PREVIEW_LENGTH)}...`
  }));

  res.render(`main`, {
    categories,
    posts,
    popularPosts,
    comments: laststComments
  });

  logger.info(LogMessage.getEndRequest(req.url));
});

module.exports = {
  mainRouter,
};
