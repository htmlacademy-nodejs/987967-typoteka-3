'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCategoryRouter = (service) => {
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const categories = await service.getCategories();
    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(categories);
    res.status(HttpStatusCode.OK).json(categories);
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
