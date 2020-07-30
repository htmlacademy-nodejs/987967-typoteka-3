'use strict';

const {HttpStatusCode} = require(`../const`);
const appLogger = require(`../../logger`).getLogger(`app`);

const createCommentFinder = (service) => async (req, res, next) => {
  try {
    const {commentId} = req.params;

    const comment = await service.getComment(commentId);
    if (!comment) {
      const message = `Can't find comment with ID='${commentId}'`;
      appLogger.error(message);
      res.status(HttpStatusCode.BAD_REQUEST).send(message);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentFinder
};
