'use strict';

const PostMiddlewares = require(`./post`);
const CategoryMiddlewares = require(`./category`);
const PrivateRoute = require(`./private-route`);
const ValidateSchema = require(`./validate-schema`);

module.exports = {
  ...PostMiddlewares,
  ...CategoryMiddlewares,
  ...PrivateRoute,
  ...ValidateSchema,
};
