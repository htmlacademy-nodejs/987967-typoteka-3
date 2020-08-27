'use strict';

const FindPost = require(`./find-post`);
const GetCategories = require(`./get-categories`);

module.exports = {
  ...FindPost,
  ...GetCategories,
};
