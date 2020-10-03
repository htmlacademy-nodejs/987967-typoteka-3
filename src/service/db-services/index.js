'use strict';

const CategoryService = require(`./category-service`);
const CommentService = require(`./comment-service`);
const PostsService = require(`./posts-service`);
const PostService = require(`./post-service`);
const UserService = require(`./user-service`);
const DBService = require(`./db-service`);

module.exports = {
  ...CategoryService,
  ...CommentService,
  ...PostsService,
  ...PostService,
  ...UserService,
  ...DBService,
};
