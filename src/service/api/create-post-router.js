'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../const`);

const createPostRouter = () => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.post(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.delete(`/:articleId`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.get(`/:articleId`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.put(`/:articleId`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.get(`/:articleId/comments`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.post(`/:articleId/comments`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  router.delete(`/:articleId/comments/:commentId`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  return router;
};

module.exports = {
  createPostRouter
};
