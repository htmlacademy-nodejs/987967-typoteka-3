'use strict';

const appLogger = require(`../../logger`).getLogger(`app`);

const requiredFields = [`title`, `date`, `categories`, `announce`];

const validatePost = (req, res, next) => {
  try {
    const post = req.body;

    if (!post) {
      const err = `Post should contain following fields: ${requiredFields.join(`, `)}, but post is empty`;
      appLogger.error(err);
      throw new Error(err);
    }

    const isValid = requiredFields.reduce((acc, cur) => {
      return acc && (cur in post);
    }, true);

    if (!isValid) {
      const err = `Post should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`;
      appLogger.error(err);
      throw new Error(err);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validatePost
};
