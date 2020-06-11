'use strict';

const {HttpStatusCode} = require(`../../const`);

const createPostFinder = (service) => (req, res, next) => {
  const id = req.params.articleId;
  const post = service.getPost(id);

  if (!post) {
    res.status(HttpStatusCode.BAD_REQUEST).send(`Post with id=${id} not found`);
    return;
  }

  res.locals.post = post;
  next();
};

module.exports = {
  createPostFinder
};
