'use strict';

const Joi = require(`joi`);
const {getValidationException} = require(`../utils`);

const createCategoryFinder = (service) => async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    await Joi.number().validateAsync(categoryId);
    const category = await service.getCategory(categoryId);

    if (!category) {
      const message = `Can't find category with ID='${categoryId}'`;
      throw getValidationException([message]);
    }

    res.locals.category = category;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategoryFinder
};
