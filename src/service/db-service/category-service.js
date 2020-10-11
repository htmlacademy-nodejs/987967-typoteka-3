'use strict';

const {Op, Sequelize} = require(`sequelize`);
const {Category} = require(`../models`);

const createCategory = async (name) => {
  return (await Category.create({name})).get({plain: true});
};

const createCategories = async (categories) => {
  return Category.bulkCreate(categories.map((it) => ({name: it.name})));
};

const getCategories = async (excludeNoPost) => {
  const query = {
    attributes: [`id`, `name`, [Sequelize.fn(`COUNT`, Sequelize.col(`posts.post_id`)), `count`]],
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
      Sequelize.where(Sequelize.fn(`COUNT`, Sequelize.col(`posts.post_id`)), {[Op.gt]: 0})
    ];
  }

  return (await Category.findAll(query)).map((it) => ({...it, count: parseInt(it.count, 10)}));
};

const getAllCategories = async () => {
  return (await Category.findAll({
    attributes: [`id`]
  })).map((it) => it.id);
};

const getCategoryByName = async (name) => {
  return Category.findOne({
    where: {name}
  });
};

const getCategory = async (id) => {
  return Category.findByPk(id);
};

const deleteCategory = async (id) => {
  return Category.destroy({
    where: {id}
  });
};

const deleteCategories = async (ids) => {
  return Category.destroy({
    where: {id: ids}
  });
};

const updateCategory = async (id, name) => {
  return Category.update({name}, {
    where: {id}
  });
};

module.exports = {
  createCategory,
  createCategories,
  getCategories,
  getAllCategories,
  getCategoryByName,
  getCategory,
  deleteCategory,
  deleteCategories,
  updateCategory,
};
