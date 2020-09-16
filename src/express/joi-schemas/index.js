'use strict';

const CommentSchema = require(`./comment`);
const PostSchema = require(`./post`);
const CategorySchema = require(`./category`);
const UserSchema = require(`./user`);

module.exports = {
  ...CommentSchema,
  ...PostSchema,
  ...CategorySchema,
  ...UserSchema,
};
