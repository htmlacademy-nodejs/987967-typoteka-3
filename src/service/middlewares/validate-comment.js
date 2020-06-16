'use strict';

const {HttpStatusCode} = require(`../../const`);

const requiredFields = [`text`];

const validateComment = (req, res, next) => {
  const comment = req.body;

  if (!comment) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Comment is empty`);
    return;
  }

  const isValid = requiredFields.reduce((acc, cur) => {
    return acc && (cur in comment);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Comment should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`);
    return;
  }

  next();
};

module.exports = {
  validateComment
};
