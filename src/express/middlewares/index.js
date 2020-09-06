'use strict';

const PostMiddlewares = require(`./post`);
const CategoryMiddlewares = require(`./category`);
const UserMiddlewares = require(`./user`);

module.exports = {
  ...PostMiddlewares,
  ...CategoryMiddlewares,
  ...UserMiddlewares,
};
