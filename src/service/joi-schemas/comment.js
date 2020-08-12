'use strict';

const Joi = require(`joi`);

const commentSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  text: Joi.string().min(20).max(1000).required(),
  userId: Joi.string().required(),
});

module.exports = {
  commentSchema,
};
