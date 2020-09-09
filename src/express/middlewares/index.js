'use strict';

const PostMiddlewares = require(`./post`);
const CategoryMiddlewares = require(`./category`);

module.exports = {
  ...PostMiddlewares,
  ...CategoryMiddlewares,
};
