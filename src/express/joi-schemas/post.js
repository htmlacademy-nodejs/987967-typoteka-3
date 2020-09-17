'use strict';

const Joi = require(`joi`);
const {TitleLength, TextLength, AnnounceLength, FileNameLength, CategoryLength} = require(`../const`);

const postSchema = Joi.object({
  title: Joi.string().min(TitleLength.MIN).max(TitleLength.MAX).required(),
  announce: Joi.string().min(AnnounceLength.MIN).max(AnnounceLength.MAX).required(),
  date: Joi.string().isoDate(),
  text: Joi.string().max(TextLength.MAX).allow(``).required(),
  originalName: Joi.string().max(FileNameLength.MAX).allow(``),
  fileName: Joi.string().max(FileNameLength.MAX).allow(``),
}).pattern(/category-id-\d+/, Joi.string().min(CategoryLength.MIN).max(CategoryLength.MAX), {matches: Joi.array().min(1)});

module.exports = {
  postSchema,
};
