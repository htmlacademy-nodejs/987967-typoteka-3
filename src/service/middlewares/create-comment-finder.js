'use strict';

const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCommentFinder = (service) => async (req, res, next) => {
  const {commentId} = req.params;

  const comment = await service.getComment(commentId);
  if (!comment) {
    const message = LogMessage.getWrongObjectID(`Comment`, commentId);
    logger.error(message);
    res.status(HttpStatusCode.BAD_REQUEST).send(message);
    return;
  }

  logger.debug(LogMessage.printObject(`Comment`, comment));
  next();
};

module.exports = {
  createCommentFinder
};
