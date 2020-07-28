'use strict';

const {getPostsSortedByDate, getPostsSortedByPopularity, getCategoryPosts} = require(`./posts`);
const {getCategories} = require(`./category`);
const {updatePicture} = require(`./picture`);

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
  getCategories,
  updatePicture,
};
