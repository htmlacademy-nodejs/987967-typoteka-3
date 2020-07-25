'use strict';

const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts} = require(`./posts`);

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
};
