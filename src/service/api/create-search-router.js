'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);

const createSearchRouter = (service) => {
  const router = new Router();

  router.get(`/`, async (req, res, next) => {
    try {
      const query = req.query.query;
      const foundPosts = await service.search(query);
      res.status(HttpStatusCode.OK).json(foundPosts);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createSearchRouter
};
