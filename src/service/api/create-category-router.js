'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCategoryRouter = (service) => {
  const router = new Router();

  router.get(`/:categoryId`, async (req, res) => {
    const {limit, offset} = req.query;
    const categoryId = req.params.categoryId;

    const posts = await service.getCategoryPosts(categoryId, limit, offset);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(posts);
    res.status(HttpStatusCode.OK).json(posts);
  });

  router.get(`/`, async (req, res) => {
    const {limit, offset, sorting: sortType} = req.query;
    const categories = await service.getCategories(sortType, limit, offset);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(categories);
    res.status(HttpStatusCode.OK).json(categories);
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
