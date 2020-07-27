'use strict';

const {Op} = require(`sequelize`);
const {Category} = require(`../models`);

const getCategories = async (sequelize, excludeNoPost) => {
  const query = {
    attributes: [`id`, `name`, [sequelize.fn(`COUNT`, sequelize.col(`posts.post_id`)), `count`]],
    include: [{
      association: Category.PostCategory,
      attributes: []
    }],
    group: [`id`],
    order: [[`name`, `ASC`]],
    raw: true
  };

  if (excludeNoPost) {
    query.having = [
      sequelize.where(sequelize.fn(`COUNT`, sequelize.col(`posts.post_id`)), {[Op.gt]: 0})
    ];
  }

  return (await Category.findAll(query)).map((it) => ({...it, count: parseInt(it.count, 10)}));
};

module.exports = {
  getCategories,
};
