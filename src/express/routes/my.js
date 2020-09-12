'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {PostSortType} = require(`../const`);
const {findPostByQuery} = require(`../middlewares`);
const Joi = require(`joi`);

const myRouter = new Router();
const dataServer = new DataServer();

myRouter.get(`/`, findPostByQuery, async (req, res, next) => {
  const {post} = res.locals;
  const {user} = req.session;

  try {
    if (post) {
      await dataServer.deletePost(post.id);
      res.redirect(`/my`);
    } else {
      const {posts} = await dataServer.getPostPreviews(PostSortType.DATE);
      res.render(`my`, {
        posts,
        user,
      });
    }
  } catch (err) {
    next(err);
  }
});

myRouter.get(`/comments`, findPostByQuery, async (req, res, next) => {
  const {post} = res.locals;
  const {user} = req.session;
  const commentIds = post ? post.comments.map((it) => it.id) : [];

  const querySchema = Joi.object({
    postId: Joi.number().required(),
    commentId: Joi.valid(...commentIds).required()
  }).allow({});

  try {
    await querySchema.validateAsync(req.query);
    const {commentId, postId} = req.query;

    if (commentId) {
      await dataServer.deleteComment(postId, commentId);
      res.redirect(`/my/comments`);
    } else {
      const comments = await dataServer.getComments();
      res.render(`comments`, {
        comments,
        user,
      });
    }
  } catch (err) {
    if (err.isJoi) {
      res.render(`400`);
      return;
    }

    next(err);
  }
});

module.exports = {
  myRouter,
};
