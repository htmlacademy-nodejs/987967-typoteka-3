'use strict';

const {Post, PostCategory, User, Picture, Comment, Category} = require(`../models`);
const {Op} = require(`sequelize`);

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
    limit,
    offset,
    subQuery: false,
    raw: true
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[sequelize.fn(`COUNT`, sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return Post.findAll(query);
};

const getPostsSortedByDate = async (sequelize, limit, offset) => {
  const postIds = (await Post.findAll({
    attributes: [`id`, `date`],
    order: [[`date`, `DESC`]],
    limit,
    offset,
    raw: true
  })).map((it) => Number(it.id));

  const query = queryPostsByIds(sequelize, postIds);
  query.order = [[`date`, `DESC`], [`id`, `ASC`]];

  return Post.findAll(query);
};

module.exports = {
  getPostsSortedByDate,
  getPostsSortedByPopularity,
};
