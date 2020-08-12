'use strict';

const {createPostFinder} = require(`./create-post-finder`);
const {createValidator} = require(`./create-validator`);
const {createCommentFinder} = require(`./create-comment-finder`);
const {createCategoryFinder} = require(`./create-category-finder`);

module.exports = {
  createPostFinder,
  createCommentFinder,
  createCategoryFinder,
  createValidator,
};
