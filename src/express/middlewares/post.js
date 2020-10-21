'use strict';

const Joi = require(`joi`);
const {dataServer} = require(`../data-server`);
const {appLogger} = require(`../logger`);
const {render} = require(`../utils`);
const {HttpStatusCode} = require(`../const`);

const findPostByParam = async (req, res, next) => {
  const {postId} = req.params;
  return findPost(postId, req, res, next);
};

const findPostByQuery = async (req, res, next) => {
  const {postId} = req.query;
  return findPost(postId, req, res, next);
};

const findPost = async (postId, req, res, next) => {
  try {
    await Joi.number().validateAsync(postId);

    if (postId) {
      res.locals.post = await dataServer.getPost(postId);
    }

    next();
  } catch (err) {
    if (err.isJoi || err.isDBServer) {
      render(`400.pug`, {}, req, res, HttpStatusCode.NOT_FOUND);
      appLogger.error(err);
      return;
    }

    next(err);
  }
};

module.exports = {
  findPostByParam,
  findPostByQuery,
};
