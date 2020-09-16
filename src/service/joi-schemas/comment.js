'use strict';

const Joi = require(`joi`);
const {CommentLength} = require(`../const`);

const commentSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  text: Joi.string().min(CommentLength.MIN).max(CommentLength.MAX).required(),
  userId: Joi.number().required(),
});

module.exports = {
  commentSchema,
};
