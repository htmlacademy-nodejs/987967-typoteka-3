'use strict';

const {Op} = require(`sequelize`);
const {Post, PostCategory, User, Picture, Comment, Category} = require(`../models`);
const {addPagination} = require(`../../utils`);

const queryPostsByIds = (sequelize, ids) =>({
  attributes: [
    `id`,
    `title`,
    `date`,
    `announce`,
    [sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `comment_count`]
  ],
  include: [{
    association: Post.Category,
    attributes: [`id`, `name`],
    through: {
      attributes: []
    },
  }, {
    association: Post.Comment,
    attributes: []
  }, {
    association: Post.Picture,
    attributes: [`name`]
  }],
  group: [`Post.id`, `categories.id`, `picture.id`],
  where: {id: {[Op.in]: ids}}
});

const getPostsSortedByPopularity = async (sequelize, limit, offset) => {
  const postIds = (await Post.findAll({
    attributes: [`Post.id`],
    include: [{
      association: Post.Comment,
      attributes: []
    }],
    group: `Post.id`,
    order: [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`]],
    ...addPagination(limit, offset),
    subQuery: false,
    raw: true
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return Post.findAll(query);
};

const getCategoryPosts = async (sequelize, categoryId, limit, offset) => {
  const postIds = (await PostCategory.findAll({
    attributes: [[`post_id`, `id`]],
    where: {[`category_id`]: categoryId},
    raw: true,
    ...addPagination(limit, offset),
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return Post.findAll(query);
};

const getPostsSortedByDate = async (sequelize, limit, offset) => {
  const postIds = (await Post.findAll({
    attributes: [`id`, `date`],
    order: [[`date`, `DESC`]],
    ...addPagination(limit, offset),
    raw: true
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[`date`, `DESC`], [`id`, `ASC`]];

  return Post.findAll(query);
};

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
};
