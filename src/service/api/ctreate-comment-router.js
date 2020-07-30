'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);

const createCommentRouter = (service) => {
  const router = new Router();

  router.get(`/`, async (req, res, next) => {
    try {
      const {limit, offset} = req.query;
      const comments = await service.getComments(limit, offset);
      res.status(HttpStatusCode.OK).json(comments);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createCommentRouter
};
