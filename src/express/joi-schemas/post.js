'use strict';

const Joi = require(`joi`);
const {TitleLength, TextLength, AnnounceLength, FileNameLength} = require(`../const`);
const {getJoiStringErrors} = require(`../utils`);

const postSchema = Joi.object({
  title: Joi.string().min(TitleLength.MIN).max(TitleLength.MAX).required().messages(getJoiStringErrors(`Title`, TitleLength)),
  announce: Joi.string().min(AnnounceLength.MIN).max(AnnounceLength.MAX).required().messages(getJoiStringErrors(`Announce`, AnnounceLength)),
  date: Joi.string().isoDate(),
  text: Joi.string().max(TextLength.MAX).allow(``).required().messages(getJoiStringErrors(`Text`, TextLength, false)),
  originalName: Joi.string().max(FileNameLength.MAX).allow(``),
  fileName: Joi.string().max(FileNameLength.MAX).allow(``),
}).pattern(/category-id-\d+/, Joi.string(), {matches: Joi.array().min(1)}).messages({
  [`object.pattern.match`]: `Необходимо выбрать минимум одну категорию`
});

module.exports = {
  postSchema,
};
