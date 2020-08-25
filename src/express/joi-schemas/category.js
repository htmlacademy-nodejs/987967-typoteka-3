'use strict';

const Joi = require(`joi`);

const categorySchema = Joi.string().min(5).max(30);

module.exports = {
  categorySchema,
};
