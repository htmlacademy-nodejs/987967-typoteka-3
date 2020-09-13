'use strict';

const PostMiddlewares = require(`./post`);
const CategoryMiddlewares = require(`./category`);
const UserMiddlewares = require(`./user`);
const PrivateRoute = require(`./private-route`);
const ValidateSchema = require(`./validate-schema`);

module.exports = {
  ...PostMiddlewares,
  ...CategoryMiddlewares,
  ...UserMiddlewares,
  ...PrivateRoute,
  ...ValidateSchema,
};
