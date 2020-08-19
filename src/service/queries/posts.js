'use strict';

const {Op} = require(`sequelize`);
const {Post, PostCategory} = require(`../models`);
const {addPagination} = require(`../utils`);
const {PostSortType} = require(`../const`);

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
    order: [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]],
    ...addPagination(limit, offset),
    subQuery: false,
    raw: true
  });

  const postIds = rows.map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return {
    posts: await Post.findAll(query),
    total: count.length,
  };
};

const getPostsSortedByDate = async (sequelize, limit, offset) => {
  const {rows, count} = await Post.findAndCountAll({
    attributes: [`id`, `date`],
    order: [[`date`, `DESC`], [`id`, `ASC`]],
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

const getCategoryPosts = async (sequelize, categoryId, limit, offset) => {
  const {rows, count} = await PostCategory.findAndCountAll({
    attributes: [[`post_id`, `id`]],
    include: [{
      association: PostCategory.Post,
      attributes: [`date`, `title`]
    }],
    where: {[`category_id`]: categoryId},
    raw: true,
    order: [[sequelize.col(`post.date`), `DESC`], [sequelize.col(`post.title`), `ASC`]],
    ...addPagination(limit, offset),
  });

  const postIds = rows.map((it) => Number(it.id));
  const query = queryPostsByIds(sequelize, postIds);

  return {
    posts: await Post.findAll({
      ...query,
      order: [[`date`, `DESC`], [`title`, `ASC`]]
    }),
    total: count,
  };
};

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
  getCategoryPosts,
};
