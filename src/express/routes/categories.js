'use strict';

const QueryString = require(`querystring`);
const {Router} = require(`express`);
const Joi = require(`joi`);
const {DataServer} = require(`../data-server`);
const {categorySchema} = require(`../joi-schemas`);
const {parseJoiException, render} = require(`../utils`);
const {privateRoute} = require(`../middlewares`);

const isEmpty = (object) => Object.keys(object).length === 0;
const isUnique = (name, categories) => categories.find((it) => it.name === name) === undefined;
const getCategoryIndex = (id, categories) => categories.findIndex((it) => it.id === id);

const categoryRouter = new Router();
const dataServer = new DataServer();

const querySchema = Joi.object({
  id: Joi.string().pattern(new RegExp(`^([0-9]+|new)$`)).required(),
  name: categorySchema.required(),
  action: Joi.string().valid(`delete`, `update`, `create`).required(),
});

const simpleQuerySchema = Joi.object({
  id: Joi.string().pattern(new RegExp(`^([0-9]+|new)$`)).required(),
  name: Joi.string().required(),
  action: Joi.string().valid(`delete`, `update`, `create`).required(),
});

const validateCategoryName = (name, categories) => {
  const errors = parseJoiException(categorySchema.validate(name, {abortEarly: false}).error);
  if (!isUnique(name, categories)) {
    errors.push(`Category name must be unique`);
  }

  return errors;
};

const validateQuery = async (req, res, next) => {
  if (isEmpty(req.query)) {
    next();
    return;
  }

  try {
    await simpleQuerySchema.validateAsync(req.query);
    next();
  } catch (err) {
    res.redirect(`/categories`);
  }
};

categoryRouter.get(`/`, [privateRoute, validateQuery], async (req, res, next) => {
  try {
    const categories = await dataServer.getCategories(false);
    const newCategory = {name: ``};

    if (isEmpty(req.query)) {
      render(`all-categories`, {categories, newCategory}, req, res);
      return;
    }

    const {action, id, name} = req.query;
    const targetCategoryIndex = getCategoryIndex(id, categories);

    if (targetCategoryIndex === -1 && action !== `create`) {
      res.redirect(`/categories`);
      return;
    }

    switch (action) {
      case `create`:
        newCategory.errors = validateCategoryName(name, categories);
        newCategory.name = name;
        break;

      case `update`:
        categories[targetCategoryIndex].errors = validateCategoryName(name, categories);
        categories[targetCategoryIndex].name = name;
        break;

      case `delete`:
        const postCount = categories[targetCategoryIndex].count;
        if (postCount !== 0) {
          categories[targetCategoryIndex].errors = [`Can't delete a category, contains any posts (${postCount})`];
        }
    }

    render(`all-categories`, {categories, newCategory}, req, res);
  } catch (err) {
    next(err);
  }
});

categoryRouter.post(`/`, privateRoute, async (req, res, next) => {
  const {name} = req.body;
  const query = {
    name,
    id: `new`,
    action: `create`
  };

  try {
    await querySchema.validateAsync(query);
    await dataServer.createCategory(name);
    res.redirect(`/categories`);
  } catch (err) {
    if (err.isJoi || err.isDBServer) {
      res.redirect(`/categories?${QueryString.encode(query)}`);
      return;
    }

    next(err);
  }
});

categoryRouter.post(`/:categoryId`, privateRoute, async (req, res, next) => {
  const id = req.params.categoryId;
  const {name, action} = req.body;
  const query = {action, id, name};

  try {
    querySchema.validateAsync(query);

    switch (action) {
      case `update`:
        await dataServer.updateCategory(id, name);
        break;

      case `delete`:
        await dataServer.deleteCategory(id);
    }

    res.redirect(`/categories`);
  } catch (err) {
    if (err.isJoi || err.isDBServer) {
      res.redirect(`/categories?${QueryString.encode(query)}`);
      return;
    }

    next(err);
  }
});

module.exports = {
  categoryRouter,
};
