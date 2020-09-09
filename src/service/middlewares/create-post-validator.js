'use strict';

const {getDifference, getValidationException} = require(`../utils`);
const {postSchema} = require(`../joi-schemas`);

const createPostValidator = (service) => async (req, res, next) => {
  try {
    await postSchema.validateAsync(req.body, {abortEarly: false});

    const existingCategories = await service.getAllCategories();

    const missingCategories = getDifference(req.body.categories, existingCategories);
    if (missingCategories.length) {
      throw getValidationException(missingCategories.map((it) => `Category "${it}" is not exists`));
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPostValidator,
};
