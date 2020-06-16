'use strict';

const {HttpStatusCode} = require(`../../const`);

const requiredFields = [`title`, `createdDate`, `fullText`, `categories`, `announce`];

const validatePost = (req, res, next) => {
  const post = req.body;

  if (!post) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Post is empty`);
    return;
  }

  const isValid = requiredFields.reduce((acc, cur) => {
    return acc && (cur in post);
  }, true);

  if (!isValid) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Post should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`);
    return;
  }

  next();
};

module.exports = {
  validatePost
};
