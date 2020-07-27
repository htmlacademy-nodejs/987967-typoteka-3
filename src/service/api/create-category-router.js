'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);
const {createCategoryFinder} = require(`../middlewares`);

const createCategoryRouter = (service) => {
  const router = new Router();
  const findCategory = createCategoryFinder(service);

  router.get(`/:categoryId`, findCategory, async (req, res) => {
    const {limit, offset} = req.query;
    const categoryId = req.params.categoryId;

    const posts = await service.getCategoryPosts(categoryId, limit, offset);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(posts);
    res.status(HttpStatusCode.OK).json(posts);
  });

  router.delete(`/:categoryId`, findCategory, async (req, res) => {
    const categoryId = req.params.categoryId;

    await service.deleteCategory(categoryId);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(res.locals.category);
  });

  router.put(`/:categoryId`, findCategory, async (req, res) => {
    const categoryId = req.params.categoryId;
    const {name} = req.body;

    const result = await service.updateCategory(categoryId, name);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(result);
  });

  router.post(`/`, async (req, res) => {
    const {name} = req.body;

    const result = await service.createCategory(name);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    res.status(HttpStatusCode.OK).json(result);
  });

  router.get(`/`, async (req, res) => {
    const {excludeEmpty} = req.query;
    const categories = await service.getCategories(excludeEmpty === `true`);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(categories);
    res.status(HttpStatusCode.OK).json(categories);
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
