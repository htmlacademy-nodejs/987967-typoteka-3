'use strict';

const Joi = require(`joi`);
const {CategoryLength} = require(`../const`);

const categorySchema = Joi.object({
  name: Joi.string().min(CategoryLength.MIN).max(CategoryLength.MAX).required(),
});

module.exports = {
  categorySchema,
};
