'use strict';

const CategoryService = require(`./category-service`);
const CommentService = require(`./comment-service`);
const PostsService = require(`./posts-service`);
const PostService = require(`./post-service`);
const UserService = require(`./user-service`);
const DBService = require(`./fill-database`);
const {dbEventEmitter} = require(`./db-event-emitter`);

module.exports = {
  ...CategoryService,
  ...CommentService,
  ...PostsService,
  ...PostService,
  ...UserService,
  ...DBService,
  dbEventEmitter,
};
