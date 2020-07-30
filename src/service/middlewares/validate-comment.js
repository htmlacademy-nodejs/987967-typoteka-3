'use strict';

const {HttpStatusCode} = require(`../const`);
const appLogger = require(`../../logger`).getLogger(`app`);

const requiredFields = [`text`];

const validateComment = (req, res, next) => {
  const comment = req.body;

  if (!comment) {
    const err = `Comment is empty`;
    appLogger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  const isValid = requiredFields.reduce((acc, cur) => {
    return acc && (cur in comment);
  }, true);

  if (!isValid) {
    const err = `Comment should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`;
    appLogger.error(err);
    res.status(HttpStatusCode.BAD_REQUEST).send(err);
    return;
  }

  next();
};

module.exports = {
  validateComment
};
