'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../const`);

const createSearchRouter = () => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).send(req.url);
  });

  return router;
};

module.exports = {
  createSearchRouter
};
