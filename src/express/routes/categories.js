'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const {DataServer} = require(`../data-server`);
const {categorySchema} = require(`../joi-schemas`);
const {parseJoiException} = require(`../utils`);
const logger = require(`../../logger`).getLogger(`app`);

const isEmpty = (object) => Object.keys(object).length === 0;
const isUnique = (name, categories) => categories.find((it) => it.name === name) === undefined;
const getCategoryIndex = (id, categories) => categories.findIndex((it) => it.id === id);

const categoryRouter = new Router();
const dataServer = new DataServer();

const querySchema = Joi.object({
  action: Joi.string().valid(`new`, `update`, `delete`).required(),
  name: Joi.string().when(`action`, {
    not: `delete`,
    then: Joi.required(),
  }),
  id: Joi.number().when(`action`, {
    not: `new`,
    then: Joi.required(),
  }),
});

const validateQuery = async (req, res, next) => {
  try {
    res.locals = {
      categories: await dataServer.getCategories(false),
      newCategory: {
        name: ``
      },
      targetCategory: undefined
    };

    if (isEmpty(req.query)) {
      res.render(`all-categories`, res.locals);
      return;
    }

    const errors = parseJoiException(querySchema.validate(req.query).error);
    if (errors.length) {
      logger.info(`Wrong query: ${errors}`);
      res.redirect(`/categories`);
      return;
    }

    next();

  } catch (err) {
    next(err);
  }
};

const validateId = (req, res, next) => {
  const {id} = req.query;

  if (!id) {
    res.locals.targetCategory = res.locals.newCategory;
    next();
    return;
  }

  const index = getCategoryIndex(id, res.locals.categories);
  if (index === -1) {
    logger.info(`Category with id ${id} not found`);
    res.redirect(`/categories`);
    return;
  }

  res.locals.targetCategory = res.locals.categories[index];
  next();
};

const validateName = async (req, res, next) => {
  const {name, action} = req.query;

  if (!name || action === `delete`) {
    next();
    return;
  }

  const errors = parseJoiException(categorySchema.validate(name, {abortEarly: false}).error);
  if (!isUnique(name, res.locals.categories)) {
    errors.push(`Category's name must be unique`);
  }

  if (errors.length) {
    res.locals.error = true;
    res.locals.targetCategory.errors = errors;
  }

  res.locals.targetCategory.name = name;

  next();
};

const validateCount = async (req, res, next) => {
  const {action} = req.query;

  if (action !== `delete`) {
    next();
    return;
  }

  const postCount = res.locals.targetCategory.count;
  if (postCount !== 0) {
    res.locals.error = true;
    res.locals.targetCategory.errors = [`Can't delete category contains posts (${postCount})`];
  }

  next();
};


categoryRouter.get(`/`, [validateQuery, validateId, validateName, validateCount], async (req, res, next) => {
  if (res.locals.error) {
    res.render(`all-categories`, res.locals);
    return;
  }

  const {id, name, action} = req.query;

  try {
    switch (action) {
      case `new`:
        await dataServer.createCategory(name);
        break;

      case `update`:
        await dataServer.updateCategory(id, name);
        break;

      case `delete`:
        await dataServer.deleteCategory(id);
        break;
    }

    res.redirect(`/categories`);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  categoryRouter,
};
