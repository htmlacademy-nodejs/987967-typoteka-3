'use strict';

const {HttpStatusCode} = require(`../const`);
const appLogger = require(`../../logger`).getLogger(`app`);

const requiredFields = [`title`, `date`, `categories`, `announce`];

const validatePost = (req, res, next) => {
  const post = req.body;

  if (!post) {
    const err = `Post should contain following fields: ${requiredFields.join(`, `)}, but post is empty`;
    appLogger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  const isValid = requiredFields.reduce((acc, cur) => {
    return acc && (cur in post);
  }, true);

  if (!isValid) {
    const err = `Post should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`;
    appLogger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  next();
};

module.exports = {
  validatePost
};
