'use strict';

const Joi = require(`joi`);
const {PostSortType} = require(`../const`);

const postLimitSchema = Joi.object({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
  sorting: Joi.string().valid(...Object.values(PostSortType)).optional(),
}).optional();

module.exports = {
  postLimitSchema,
};
