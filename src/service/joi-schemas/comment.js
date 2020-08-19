'use strict';

const Joi = require(`joi`);

const commentSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  text: Joi.string().min(20).max(1000).required(),
  userId: Joi.number().required(),
  // postId: Joi.number().required(),
});

module.exports = {
  commentSchema,
};
