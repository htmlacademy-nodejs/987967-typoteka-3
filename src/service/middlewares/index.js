'use strict';

const {createPostFinder} = require(`./create-post-finder`);
const {createPostValidator} = require(`./create-post-validator`);
const {createCommentFinder} = require(`./create-comment-finder`);
const {createCategoryFinder} = require(`./create-category-finder`);

module.exports = {
  createPostFinder,
  createCommentFinder,
  createCategoryFinder,
  createPostValidator,
};
