'use strict';

const {commentSchema} = require(`../joi-schemas`);
const {getValidationException} = require(`../utils`);

const createCommentValidator = (service) => async (req, res, next) => {
  try {
    await commentSchema.validateAsync(req.body, {abortEarly: false});

    const userId = req.body.userId;
    const user = await service.getUser(userId);

    if (!user) {
      throw getValidationException([`User "${userId}" is not exists`]);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentValidator,
};
