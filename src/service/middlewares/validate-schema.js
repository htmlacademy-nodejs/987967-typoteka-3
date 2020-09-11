'use strict';

const {parseException} = require(`../utils`);
const {HttpStatusCode} = require(`../const`);

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {abortEarly: false});
    next();
  } catch (err) {
    if (err.isJoi) {
      res.status(HttpStatusCode.BAD_REQUEST).send(parseException(err));
    } else {
      next(err);
    }
  }
};

module.exports = {
  validateSchema,
};
