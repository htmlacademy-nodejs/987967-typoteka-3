'use strict';

const Joi = require(`joi`);
const {CommentLength} = require(`../const`);

const commentSchema = Joi.string().min(CommentLength.MIN).max(CommentLength.MAX).required();

module.exports = {
  commentSchema,
};
