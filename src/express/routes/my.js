'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {PostSortType} = require(`../const`);

const myRouter = new Router();
const dataServer = new DataServer();

myRouter.get(`/`, async (req, res, next) => {
  const {delete: deleteId} = req.query;
  if (deleteId) {
    try {
      await dataServer.deletePost(deleteId);
      res.redirect(`/my`);
    } catch (err) {
      next(err);
    }
  } else {
    const {posts} = await dataServer.getPostPreviews(PostSortType.DATE);
    res.render(`my`, {
      posts
    });
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
    const comments = await dataServer.getComments();
    res.render(`comments`, {
      comments,
    });
  }

});

module.exports = {
  myRouter,
};
