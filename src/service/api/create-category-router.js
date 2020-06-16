'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../const`);

const createCategoryRouter = (service) => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    res.status(HttpStatusCode.OK).json(service.getCategories());
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
