'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);

const createSearchRouter = (service) => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    const query = req.query.query;
    const foundPosts = service.search(query);
    res.status(HttpStatusCode.OK).json(foundPosts);
  });

  return router;
};

module.exports = {
  createSearchRouter
};
