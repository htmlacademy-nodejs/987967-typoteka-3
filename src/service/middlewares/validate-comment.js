'use strict';

const appLogger = require(`../../logger`).getLogger(`app`);

const requiredFields = [`text`];

const validateComment = (req, res, next) => {
  try {
    const comment = req.body;

    if (!comment) {
      const err = `Comment is empty`;
      appLogger.error(err);
      throw new Error(err);
    }

    const isValid = requiredFields.reduce((acc, cur) => {
      return acc && (cur in comment);
    }, true);

    if (!isValid) {
      const err = `Comment should contain following fields: ${requiredFields.join(`, `)}, but doesn't contain some`;
      appLogger.error(err);
      throw new Error(err);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateComment
};
