'use strict';

const Joi = require(`joi`);
const {CategoryLength} = require(`../const`);

const categorySchema = Joi.string().min(CategoryLength.MIN).max(CategoryLength.MAX);

module.exports = {
  categorySchema,
};
