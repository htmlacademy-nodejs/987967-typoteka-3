'use strict';

const Joi = require(`joi`);
const {CommentLength} = require(`../const`);

const commentSchema = Joi.object({
  text: Joi.string().min(CommentLength.MIN).max(CommentLength.MAX).required()
});

module.exports = {
  commentSchema,
};
