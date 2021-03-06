'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {postLimitSchema, commentSchema, postSchema} = require(`../joi-schemas`);
const {createPostFinder, createCommentFinder, createUserFinder, validateSchema, createCategoryAvailability} = require(`../middlewares`);

const createPostRouter = (service) => {
  const findPost = createPostFinder(service);
  const findComment = createCommentFinder(service);
  const findUser = createUserFinder(service);
  const categoryAvailability = createCategoryAvailability(service);
  const router = new Router();

  router.get(`/`, async (req, res, next) => {
    try {
      await postLimitSchema.validateAsync(req.query);

      const {limit, offset, sorting: sortType} = req.query;
      const posts = await service.getPosts(sortType, limit, offset);
      res.status(HttpStatusCode.OK).json(posts);
    } catch (err) {
      next(err);
      return;
    }
  });

  router.post(`/`, [validateSchema(postSchema), categoryAvailability], async (req, res, next) => {
    try {
      const post = await service.createPost(req.body);
      res.status(HttpStatusCode.CREATE).json(post);
    } catch (err) {
      next(err);
      return;
    }
  });

  router.delete(`/:articleId`, findPost, async (req, res, next) => {
    const post = res.locals.post;

    try {
      await service.deletePost(post.id);
      res.status(HttpStatusCode.OK).json(post);
    } catch (err) {
      next(err);
      return;
    }
  });

  router.get(`/:articleId`, findPost, (req, res) => {
    res.status(HttpStatusCode.OK).json(res.locals.post);
  });

  router.put(`/:articleId`, [findPost, validateSchema(postSchema), categoryAvailability], async (req, res, next) => {
    try {
      res.status(HttpStatusCode.OK).json(await service.updatePost(req.params.articleId, req.body));
    } catch (err) {
      next(err);
      return;
    }
  });

  router.get(`/:articleId/comments`, findPost, async (req, res, next) => {
    try {
      res.status(HttpStatusCode.OK).json(res.locals.post.comments);
    } catch (err) {
      next(err);
      return;
    }
  });

  router.post(`/:articleId/comments`, [findPost, findUser, validateSchema(commentSchema)], async (req, res, next) => {
    try {
      await commentSchema.validateAsync(req.body);

      const {text, userId, date} = req.body;
      const commentData = {
        postId: req.params.articleId,
        userId,
        text,
        date,
      };

      const comment = await service.createComment(commentData);

      res.status(HttpStatusCode.CREATE).json(comment);
    } catch (err) {
      next(err);
    }
  });

  router.delete(`/:articleId/comments/:commentId`, [findPost, findComment], async (req, res, next) => {
    const {commentId, articleId} = req.params;

    try {
      await service.deleteComment(commentId, articleId);
      res.status(HttpStatusCode.OK).json(commentId);
    } catch (err) {
      next(err);
      return;
    }
  });

  return router;
};

module.exports = {
  createPostRouter
};
