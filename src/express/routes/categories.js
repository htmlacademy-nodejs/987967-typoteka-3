'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {CategoryLength} = require(`../const`);

const parseFormData = (formData) => {
  const categoryField = Object.keys(formData).find((it) => /^category-.+$/.test(it));
  const name = formData[categoryField];
  const id = categoryField.replace(`category-`, ``);
  return {
    id,
    name,
  };
};

const getValidationMessage = (name) => {
  if (!name) {
    return `Category's name mustn't be empty`;
  }

  if (name.length <= CategoryLength.MIN || name.length >= CategoryLength.MAX) {
    return `Category name's length must be between ${CategoryLength.MIN} and ${CategoryLength.MAX} characters`;
  }

  return ``;
};

const getCategoryIndex = (categories, id) => categories.findIndex((it) => it.id === id);

const categoryRouter = new Router();
const dataServer = new DataServer();

categoryRouter.get(`/`, async (req, res) => {
  const categories = await dataServer.getCategories(false);
  res.render(`all-categories`, {categories});
});

categoryRouter.post(`/`, async (req, res) => {
  const {action: actionType} = req.body;
  const {id, name} = parseFormData(req.body);
  const categories = await dataServer.getCategories(false);
  const categoryIndex = getCategoryIndex(categories, id);
  const validationMessage = getValidationMessage(name);

  let action;

  switch (actionType) {
    case `delete`:
      const count = categories[categoryIndex].count;
      if (count) {
        categories[categoryIndex].error = `This category contains ${count} posts. Delete all posts before deleting the category`;
        return res.render(`all-categories`, {categories});
      }

      action = dataServer.deleteCategory(id);
      break;

    case `update`:
      if (validationMessage) {
        categories[categoryIndex].error = validationMessage;
        return res.render(`all-categories`, {categories});
      }

      action = dataServer.updateCategory(id, name);
      break;

    case `new`:
      if (validationMessage) {
        categories.newItem = name;
        categories.newItemError = validationMessage;
        return res.render(`all-categories`, {categories});
      }

      action = dataServer.createCategory(name);
  }

  await action;
  return res.redirect(`/categories`);
});

module.exports = {
  categoryRouter,
};
