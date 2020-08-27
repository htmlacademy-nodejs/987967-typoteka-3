'use strict';

const CommentSchema = require(`./comment`);
const PostSchema = require(`./post`);
const LimitSchema = require(`./limit-offset`);
const PostLimitSchema = require(`./post-limit`);
const CategorySchema = require(`./category`);

module.exports = {
  ...CommentSchema,
  ...PostSchema,
  ...LimitSchema,
  ...PostLimitSchema,
  ...CategorySchema,
};
