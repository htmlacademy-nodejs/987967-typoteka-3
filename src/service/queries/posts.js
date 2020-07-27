'use strict';

const {Op, or} = require(`sequelize`);
const {Post, PostCategory} = require(`../models`);
const {addPagination} = require(`../../utils`);
const {PostSortType} = require(`../db-const`);

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

const getCategoryPosts = async (sequelize, categoryId, limit, offset, sortType) => {
  const postIds = (await PostCategory.findAll({
    attributes: [[`post_id`, `id`]],
    where: {[`category_id`]: categoryId},
    raw: true,
    ...addPagination(limit, offset),
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);

  let order;

  switch (sortType) {
    case PostSortType.BY_DATE:
      order = [[`date`, `DESC`], [`title`, `ASC`]];
      break;

    case PostSortType.BY_POPULARITY:
    default:
      order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`title`, `ASC`]];
  }

  return Post.findAll({...query, order});
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
