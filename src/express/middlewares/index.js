'use strict';

const PostMiddlewares = require(`./post`);
const CategoryMiddlewares = require(`./category`);
const UserMiddlewares = require(`./user`);
const PrivateRoute = require(`./private-route`);

module.exports = {
  ...PostMiddlewares,
  ...CategoryMiddlewares,
  ...UserMiddlewares,
  ...PrivateRoute,
};
