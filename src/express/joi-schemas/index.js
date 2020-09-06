'use strict';

const CommentSchema = require(`./comment`);
const PostSchema = require(`./post`);
const LimitSchema = require(`./limit-offset`);
const PostLimitSchema = require(`./post-limit`);
const CategorySchema = require(`./category`);
const UserSchema = require(`./user`);

module.exports = {
  ...CommentSchema,
  ...PostSchema,
  ...LimitSchema,
  ...PostLimitSchema,
  ...CategorySchema,
  ...UserSchema,
};
