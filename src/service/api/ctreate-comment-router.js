'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {logger, LogMessage} = require(`../../logger`);

const createCommentRouter = (service) => {
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const {limit, offset} = req.query;
    const comments = await service.getComments(limit, offset);

    logger.info(LogMessage.getEndRequest(req.url, HttpStatusCode.OK));
    logger.debug(comments);
    res.status(HttpStatusCode.OK).json(comments);
  });

  return router;
};

module.exports = {
  createCommentRouter
};
