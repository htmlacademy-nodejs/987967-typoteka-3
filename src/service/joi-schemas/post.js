'use strict';

const Joi = require(`joi`);
const {TitleLength, FileNameLength, AnnounceLength, TextLength} = require(`../const`);

const postSchema = Joi.object({
  title: Joi.string().min(TitleLength.MIN).max(TitleLength.MAX).required(),
  announce: Joi.string().min(AnnounceLength.MIN).max(AnnounceLength.MAX).required(),
  categories: Joi.array().items(Joi.number()).min(1).required(),
  date: Joi.string().isoDate(),
  text: Joi.string().max(TextLength.MAX).allow(``).optional(),
  picture: Joi.object({
    name: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX).when(`originalName`, {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
    originalName: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX)
  }).optional().allow(null)
});

module.exports = {
  postSchema,
};
