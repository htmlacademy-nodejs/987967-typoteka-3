'use strict';

const {createPostFinder} = require(`./create-post-finder`);
const {createCommentFinder} = require(`./create-comment-finder`);
const {createCategoryFinder} = require(`./create-category-finder`);
const {createPostValidator} = require(`./create-post-validator`);
const {createCommentValidator} = require(`./create-comment-validator`);

module.exports = {
  createPostFinder,
  createCommentFinder,
  createCategoryFinder,
  createPostValidator,
  createCommentValidator,
};
