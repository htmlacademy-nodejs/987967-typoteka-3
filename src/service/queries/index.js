'use strict';

const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts} = require(`./posts`);
const {getCategories, testGetPostsWithCommentCount} = require(`./category`);

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
  getCategories,
  testGetPostsWithCommentCount
};
