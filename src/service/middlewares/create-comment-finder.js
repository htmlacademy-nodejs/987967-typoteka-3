'use strict';

const {HttpStatusCode} = require(`../../const`);

const createCommentFinder = (service) => (req, res, next) => {
  const {articleId, commentId} = req.params;

  const post = service.getPOst(articleId);
  if (!post) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Post with id=${articleId} not found`);
    return;
  }

  const comment = service.getComment(articleId, commentId);
  if (!comment) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Comment with id=${commentId} not found`);
    return;
  }

  next();
};

module.exports = {
  createCommentFinder
};
