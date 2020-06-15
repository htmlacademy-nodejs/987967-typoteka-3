'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {ANNOUNCE_COUNT, LASTST_COMMENT_COUNT, POPULAR_POST_COUNT, ANNOUNCE_PREVIEW_LENGTH, COMMENT_PREVIEW_LENGTH} = require(`../const`);
const {getLogger, LogMessage, LoggerName} = require(`../../logger`);

const mainRouter = new Router();
const dataServer = new DataServer();
const logger = getLogger(LoggerName.FRONT_SERVER_API);

mainRouter.get(`/`, async (req, res, next) => {
  let categories;
  let postPreviews;
  try {
    [categories, postPreviews] = await Promise.all([dataServer.getCategories(), dataServer.getPostPreviews()]);
  } catch (err) {
    next(err);
    return;
  }

  postPreviews.sort((a, b) => b.createdDate - a.createdDate);
  const posts = postPreviews.slice(0, ANNOUNCE_COUNT);

  postPreviews.sort((a, b) => b.comments.length - a.comments.length);
  const popularPosts = postPreviews.slice(0, POPULAR_POST_COUNT).map((it) => ({
    ...it,
    announce: `${it.announce.slice(0, ANNOUNCE_PREVIEW_LENGTH)}...`
  }));

  let comments = [];
  postPreviews.forEach((it) => {
    comments = [...comments, ...it.comments];
  });
  comments.sort((a, b) => b.date > a.date);
  const laststComments = comments.slice(0, LASTST_COMMENT_COUNT).map((it) => ({
    ...it,
    text: `${it.text.slice(0, COMMENT_PREVIEW_LENGTH)}...`
  }));

  res.render(`main`, {
    categories,
    posts,
    popularPosts,
    comments: laststComments
  });
});

module.exports = {
  mainRouter,
};
