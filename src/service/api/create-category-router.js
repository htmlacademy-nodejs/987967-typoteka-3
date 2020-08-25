'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const {limitSchema, categorySchema} = require(`../joi-schemas`);
const {HttpStatusCode} = require(`../const`);
const {getValidationException} = require(`../utils`);
const {createCategoryFinder} = require(`../middlewares`);

const createCategoryRouter = (service) => {
  const router = new Router();
  const findCategory = createCategoryFinder(service);

  router.get(`/:categoryId`, findCategory, async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
      await limitSchema.validateAsync(req.query);

      const {limit, offset} = req.query;
      const posts = await service.getCategoryPosts(categoryId, limit, offset);
      res.status(HttpStatusCode.OK).json({
        ...posts,
        categoryName: res.locals.category.name
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(`/:categoryId`, findCategory, async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const categoryPosts = await service.getCategoryPosts(categoryId);

      if (categoryPosts.total !== 0) {
        throw getValidationException([`Can't delete category contains posts`]);
      }

      await service.deleteCategory(categoryId);
      res.status(HttpStatusCode.OK).json(res.locals.category);
    } catch (err) {
      next(err);
    }
  });

  router.put(`/:categoryId`, findCategory, async (req, res, next) => {
    try {
      await categorySchema.validateAsync(req.body);

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
      await categorySchema.validateAsync(req.body);

      const {name} = req.body;

      if (await service.getCategoryByName(name)) {
        throw getValidationException([`Category name must be unique`]);
      }

      const result = await service.createCategory(name);
      res.status(HttpStatusCode.CREATE).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/`, async (req, res, next) => {
    const schema = Joi.object({
      excludeEmpty: Joi.string().valid(`true`, `false`).optional()
    });

    try {
      await schema.validateAsync(req.query);

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
