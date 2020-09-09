'use strict';

const Joi = require(`joi`);
const {createBadRequestException, getDifference} = require(`../utils`);

const createCategoryFinder = (service) => async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    await Joi.number().validateAsync(categoryId);
    const category = await service.getCategory(categoryId);

    if (!category) {
      const message = `Can't find category with ID='${categoryId}'`;
      throw createBadRequestException([message]);
    }

    res.locals.category = category;
    next();
  } catch (err) {
    next(err);
  }
};

const createCategoryAvailability = (service) => async (req, res, next) => {
  try {
    const existingCategories = await service.getAllCategories();
    const missingCategories = getDifference(req.body.categories, existingCategories);

    if (missingCategories.length) {
      throw createBadRequestException(missingCategories.map((it) => `Category "${it}" is not exists`));
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategoryFinder,
  createCategoryAvailability
};
