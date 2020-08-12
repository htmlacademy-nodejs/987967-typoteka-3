'use strict';

const {HttpStatusCode} = require(`../const`);
const {getDifference} = require(`../utils`);

const getException = (messages) => ({
  details: messages.map((it) => ({message: it}))
});

const createPostValidator = (schema, service) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {abortEarly: false});

    const existingCategories = await service.getAllCategories();

    console.log(existingCategories);
    const missingCategories = getDifference(req.body.categories, existingCategories);
    if (missingCategories.length) {
      throw getException(missingCategories.map((it) => `Category "${it}" is not exists`));
    }

    next();
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      messages: err.details.map((it) => it.message)
    });
  }
};

module.exports = {
  createPostValidator,
};
