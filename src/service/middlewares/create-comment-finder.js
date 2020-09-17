'use strict';

const Joi = require(`joi`);
const {createBadRequestException} = require(`../utils`);

const createCommentFinder = (service) => async (req, res, next) => {
  try {
    const {commentId} = req.params;
    await Joi.number().validateAsync(commentId);

    const comment = await service.getComment(commentId);
    if (!comment) {
      const message = `Can't find comment with ID='${commentId}'`;
      throw createBadRequestException([message]);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentFinder
};
