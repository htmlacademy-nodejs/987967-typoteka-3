'use strict';

const Joi = require(`joi`);
const {DataServer} = require(`../data-server`);
const loggerApp = require(`../../logger`).getLogger(`app`);

const dataServer = new DataServer();

const findPost = async (req, res, next) => {
  const {postId} = req.params;

  try {
    await Joi.number().validateAsync(postId);
    res.locals.post = await dataServer.getPost(postId);
    next();
  } catch (err) {
    if (err.isJoi || err.isDBServer) {
      res.status(404).render(`400.pug`);
      loggerApp.error(err);
      return;
    }

    next(err);
  }
};

module.exports = {
  findPost,
};
