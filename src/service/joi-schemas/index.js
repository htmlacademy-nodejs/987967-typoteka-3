'use strict';

const {commentSchema} = require(`./comment`);
const {postSchema} = require(`./post`);
const {limitSchema} = require(`./limit-offset`);
const {postLimitSchema} = require(`./post-limit`);
const {categorySchema} = require(`./category`);
const {userSchema} = require(`./user`);

module.exports = {
  commentSchema,
  postSchema,
  limitSchema,
  postLimitSchema,
  categorySchema,
  userSchema,
};
