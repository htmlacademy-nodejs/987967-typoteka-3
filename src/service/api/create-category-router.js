'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {createCategoryFinder} = require(`../middlewares`);
const appLogger = require(`../../logger`).getLogger(`app`);

const createCategoryRouter = (service) => {
  const router = new Router();
  const findCategory = createCategoryFinder(service);

  router.get(`/:categoryId`, findCategory, async (req, res, next) => {
    const {limit, offset} = req.query;
    const categoryId = req.params.categoryId;
    let posts;

    try {
      posts = await service.getCategoryPosts(categoryId, limit, offset);
    } catch (err) {
      appLogger.error(`Bad database request`);
      next(err);
    }

    res.status(HttpStatusCode.OK).json({
      ...posts,
      categoryName: res.locals.category.name
    });
  });

  router.delete(`/:categoryId`, findCategory, async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      await service.deleteCategory(categoryId);
      res.status(HttpStatusCode.OK).json(res.locals.category);
    } catch (err) {
      next(err);
    }
  });

  router.put(`/:categoryId`, findCategory, async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const {name} = req.body;
      const result = await service.updateCategory(categoryId, name);
      res.status(HttpStatusCode.OK).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.post(`/`, async (req, res, next) => {
    try {
      const {name} = req.body;
      const result = await service.createCategory(name);
      res.status(HttpStatusCode.OK).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/`, async (req, res, next) => {
    try {
      const {excludeEmpty} = req.query;
      const categories = await service.getCategories(excludeEmpty === `true`);
      res.status(HttpStatusCode.OK).json(categories);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createCategoryRouter
};
