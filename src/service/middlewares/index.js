'use strict';

const CreatePostFinder = require(`./create-post-finder`);
const CreateCommentFinder = require(`./create-comment-finder`);
const CreateCategoryFinder = require(`./create-category-finder`);
const CreateUserFinder = require(`./create-user-finder`);
const ValidateSchema = require(`./validate-schema`);

module.exports = {
  ...CreatePostFinder,
  ...CreateCommentFinder,
  ...CreateUserFinder,
  ...CreateCategoryFinder,
  ...ValidateSchema,
};
