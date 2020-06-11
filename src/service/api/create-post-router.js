'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../const`);
const {createPostFinder, validatePost, validateComment, createCommentFinder} = require(`../middlewares`);


const createPostRouter = (service) => {
  const findPost = createPostFinder(service);
  const findComment = createCommentFinder(service);
  const router = new Router();

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getPosts());
  });

  router.post(`/`, validatePost, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.createPost(req.body));
  });

  router.delete(`/:articleId`, [findPost], (req, res) => {
    const post = res.locals.post;
    service.deletePost(post.id);
    res.status(HttpStatusCode.OK).json(post);
  });

  router.get(`/:articleId`, [findPost], (req, res) => {
    res.status(HttpStatusCode.OK).json(res.locals.post);
  });

  router.put(`/:articleId`, [findPost, validatePost], (req, res) => {
    res.status(HttpStatusCode.OK).json(service.updatePost(req.params.articleId, req.body));
  });

  router.get(`/:articleId/comments`, [findPost], (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getComments(req.params.articleId));
  });

  router.post(`/:articleId/comments`, [findPost, validateComment], (req, res) => {
    res.status(HttpStatusCode.OK).json(service.createComment(req.params.articleId, req.body));
  });

  router.delete(`/:articleId/comments/:commentId`, [findPost, findComment], (req, res) => {
    const {articleId, commentId} = req.params;
    res.status(HttpStatusCode.OK).json(service.deleteComment(articleId, commentId));
  });

  return router;
};

module.exports = {
  createPostRouter
};
