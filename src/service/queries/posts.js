'use strict';

const {Op} = require(`sequelize`);
const {Post, PostCategory} = require(`../models`);
// const {addPagination} = require(`../utils`);
const {PostSortType} = require(`../const`);

const addPagination = (limit, offset = 0) => {
  return limit ? {
    limit,
    offset
  } : {};
};

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
  const {count, rows} = await Post.findAndCountAll({
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
  });

  const postIds = rows.map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return {
    posts: await Post.findAll(query),
    total: count,
  };
};

const getCategoryPosts = async (sequelize, categoryId, limit, offset, sortType) => {
  const {rows, count} = await PostCategory.findAndCountAll({
    attributes: [[`post_id`, `id`]],
    where: {[`category_id`]: categoryId},
    raw: true,
    ...addPagination(limit, offset),
  });
  const postIds = rows.map((it) => Number(it.id));
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

  return {
    posts: await Post.findAll({...query, order}),
    total: count,
  };
};

const getPostsSortedByDate = async (sequelize, limit, offset) => {
  const {rows, count} = await Post.findAndCountAll({
    attributes: [`id`, `date`],
    order: [[`date`, `DESC`]],
    ...addPagination(limit, offset),
    raw: true
  });

  const postIds = rows.map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[`date`, `DESC`], [`id`, `ASC`]];

  return {
    posts: await Post.findAll(query),
    total: count,
  };
};

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
};
