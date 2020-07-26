'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {createPostFinder, validatePost, validateComment, createCommentFinder} = require(`../middlewares`);
const {logger, LogMessage} = require(`../../logger`);

const createPostRouter = (service) => {
  const findPost = createPostFinder(service);
  const findComment = createCommentFinder(service);
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const {limit, offset, sorting: sortType} = req.query;

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(await service.getPosts(sortType, limit, offset));
  });

  router.post(`/`, validatePost, (req, res) => {
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.CREATE));
    res.status(HttpStatusCode.CREATE).json(service.createPost(req.body));
  });

  router.delete(`/:articleId`, [findPost], (req, res) => {
    const post = res.locals.post;
    service.deletePost(post.id);
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(post);
  });

  router.get(`/:articleId`, [findPost], (req, res) => {
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(res.locals.post);
  });

  router.put(`/:articleId`, [findPost, validatePost], (req, res) => {
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(service.updatePost(req.params.articleId, req.body));
  });

  router.get(`/:articleId/comments`, [findPost], (req, res) => {
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(service.getComments(req.params.articleId));
  });

  router.post(`/:articleId/comments`, [findPost, validateComment], (req, res) => {
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.CREATE));
    res.status(HttpStatusCode.CREATE).json(service.createComment(req.params.articleId, req.body));
  });

  router.delete(`/:articleId/comments/:commentId`, [findPost, findComment], (req, res) => {
    const {articleId, commentId} = req.params;
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(service.deleteComment(commentId));
  });

  return router;
};

module.exports = {
  createPostRouter
};
