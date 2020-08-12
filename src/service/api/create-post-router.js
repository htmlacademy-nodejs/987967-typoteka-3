'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {createPostFinder, createPostValidator, createCommentFinder} = require(`../middlewares`);
const {postSchema, commentSchema} = require(`../joi-schemas`);

const createPostRouter = (service) => {
  const findPost = createPostFinder(service);
  const findComment = createCommentFinder(service);
  const validatePost = createPostValidator(postSchema, service);
  /* !!! */const validateComment = createPostValidator(commentSchema);
  const router = new Router();

  router.get(`/`, async (req, res, next) => {
    const {limit, offset, sorting: sortType} = req.query;
    let posts;

    try {
      posts = await service.getPosts(sortType, limit, offset);
    } catch (err) {
      next(err);
      return;
    }

    res.status(HttpStatusCode.OK).json(posts);
  });

  router.post(`/`, validatePost, async (req, res, next) => {
    let post;

    try {
      post = await service.createPost(req.body);
    } catch (err) {
      next(err);
      return;
    }

    res.status(HttpStatusCode.CREATE).json(post);
  });

  router.delete(`/:articleId`, [findPost], async (req, res, next) => {
    const post = res.locals.post;

    try {
      await service.deletePost(post.id);
    } catch (err) {
      next(err);
      return;
    }
    res.status(HttpStatusCode.OK).json(post);
  });

  router.get(`/:articleId`, findPost, (req, res) => {
    res.status(HttpStatusCode.OK).json(res.locals.post);
  });

  router.put(`/:articleId`, [findPost, validatePost], async (req, res, next) => {
    try {
      res.status(HttpStatusCode.OK).json(await service.updatePost(req.params.articleId, req.body));
    } catch (err) {
      next(err);
      return;
    }
  });

  router.get(`/:articleId/comments`, findPost, async (req, res, next) => {
    try {
      res.status(HttpStatusCode.OK).json(await service.getComments(req.params.articleId));
    } catch (err) {
      next(err);
      return;
    }
  });

  router.post(`/:articleId/comments`, [findPost, validateComment], async (req, res, next) => {
    let comment;
    try {
      comment = await service.createComment(req.params.articleId, req.body);
    } catch (err) {
      next(err);
      return;
    }

    res.status(HttpStatusCode.CREATE).json(comment);
  });

  router.delete(`/:articleId/comments/:commentId`, [findPost, findComment], async (req, res, next) => {
    const {commentId} = req.params;

    try {
      await service.deleteComment(commentId);
    } catch (err) {
      next(err);
      return;
    }

    res.status(HttpStatusCode.OK).json(commentId);
  });

  return router;
};

module.exports = {
  createPostRouter
};
