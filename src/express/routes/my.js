'use strict';

const {Router} = require(`express`);
const {dataServer} = require(`../data-server`);
const {PostSortType, HttpStatusCode} = require(`../const`);
const {render} = require(`../utils`);
const {findPostByQuery} = require(`../middlewares`);
const Joi = require(`joi`);

const myRouter = new Router();

myRouter.get(`/`, findPostByQuery, async (req, res, next) => {
  const {post} = res.locals;

  try {
    if (post) {
      await dataServer.deletePost(post.id);
      res.redirect(`/my`);
    } else {
      const {posts} = await dataServer.getPostPreviews(PostSortType.DATE);
      render(`my`, {
        posts,
      }, req, res);
    }
  } catch (err) {
    next(err);
  }
});

myRouter.get(`/comments`, findPostByQuery, async (req, res, next) => {
  const {post} = res.locals;
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
      render(`comments`, {
        comments,
      }, req, res);
    }
  } catch (err) {
    if (err.isJoi) {
      render(`400`, {}, req, res, HttpStatusCode.NOT_FOUND);
      return;
    }

    next(err);
  }
});

module.exports = {
  myRouter,
};
