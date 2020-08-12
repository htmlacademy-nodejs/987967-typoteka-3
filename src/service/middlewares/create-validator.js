'use strict';

const {HttpStatusCode} = require(`../const`);

const createValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {abortEarly: false});
    next();
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      messages: err.details.map((it) => it.message)
    });
  }
};

module.exports = {
  createValidator,
};
