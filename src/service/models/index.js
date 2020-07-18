'use strict';

const {User} = require(`./user`);
const {Password} = require(`./password`);
const {Avatar} = require(`./avatar`);
const {Picture} = require(`./picture`);
const {Post} = require(`./post`);
const {Comment} = require(`./comment`);
const {Category} = require(`./category`);
const {PostCategory} = require(`./post-category`);

module.exports = {
  User,
  Password,
  Avatar,
  Picture,
  Post,
  Comment,
  Category,
  PostCategory,
};
