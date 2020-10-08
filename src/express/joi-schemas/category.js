'use strict';

const Joi = require(`joi`);
const {CategoryLength} = require(`../const`);
const {getJoiStringErrors} = require(`../utils`);

const categorySchema = Joi.string().min(CategoryLength.MIN).max(CategoryLength.MAX).messages(getJoiStringErrors(`Категория`, CategoryLength));

module.exports = {
  categorySchema,
};
