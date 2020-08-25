'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {PostSortType} = require(`../const`);

const myRouter = new Router();
const dataServer = new DataServer();

myRouter.get(`/`, async (req, res, next) => {
  const {delete: deleteId} = req.query;

  try {
    if (deleteId) {
      await dataServer.deletePost(deleteId);
      res.redirect(`/my`);
    } else {
      const {posts} = await dataServer.getPostPreviews(PostSortType.DATE);
      res.render(`my`, {
        posts
      });
    }
  } catch (err) {
    next(err);
  }
});

myRouter.get(`/comments`, async (req, res, next) => {
  const {delete: commentId, post: postId} = req.query;
  if (commentId) {
    try {
      await dataServer.deleteComment(postId, commentId);
      res.redirect(`/my/comments`);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const comments = await dataServer.getComments();
      res.render(`comments`, {
        comments,
      });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = {
  myRouter,
};
