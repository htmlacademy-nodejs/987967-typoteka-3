'use strict';

const appLogger = require(`../../logger`).getLogger(`app`);

const createCommentFinder = (service) => async (req, res, next) => {
  try {
    const {commentId} = req.params;

    const comment = await service.getComment(commentId);
    if (!comment) {
      const message = `Can't find comment with ID='${commentId}'`;
      appLogger.error(message);
      throw new Error(message);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentFinder
};
