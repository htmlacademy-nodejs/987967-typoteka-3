'use strict';

const Joi = require(`joi`);
const {DataServer} = require(`../data-server`);
const loggerApp = require(`../../logger`).getLogger(`app`);
const {render} = require(`../utils`);
const {HttpStatusCode} = require(`../const`);

const dataServer = new DataServer();

const getCategories = async (req, res, next) => {
  try {
    res.locals.categories = await dataServer.getCategories(true);
    next();
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    res.locals.categories = await dataServer.getCategories(false);
    next();
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const {categories} = res.locals;
    if (!categories) {
      throw new Error(`The "getCategory" middleware needs to define res.locals.categories`);
    }

    const {categoryId} = req.params;
    const categoryIdSchema = Joi.valid(...categories.map((it) => it.id)).required();
    await categoryIdSchema.validateAsync(categoryId);

    res.locals.category = categories.find((it) => it.id === categoryId);
    next();
  } catch (err) {
    if (err.isJoi || err.isDBServer) {
      render(`400.pug`, {}, req, res, HttpStatusCode.NOT_FOUND);
      loggerApp.error(err);
      return;
    }

    next(err);
  }
};

module.exports = {
  getCategories,
  getAllCategories,
  getCategory,
};
