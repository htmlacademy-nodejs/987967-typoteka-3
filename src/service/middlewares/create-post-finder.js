'use strict';

const Joi = require(`joi`);
const {createBadRequestException} = require(`../utils`);

const createPostFinder = (service) => async (req, res, next) => {
  try {
    const id = req.params.articleId;
    await Joi.number().validateAsync(id);
    const post = await service.getPost(id);

    if (post === null) {
      const message = `Can't find post with ID='${id}'`;
      throw createBadRequestException([message]);
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
