'use strict';

const {HttpStatusCode} = require(`../const`);
const appLogger = require(`../../logger`).getLogger(`app`);

const createPostFinder = (service) => async (req, res, next) => {
  try {
    const id = req.params.articleId;
    const post = await service.getPost(id);

    if (!post) {
      const message = `Can't find post with ID='${id}'`;
      appLogger.error(message);
      res.status(HttpStatusCode.BAD_REQUEST).send(message);
      return;
    }

    res.locals.post = post;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPostFinder
};
