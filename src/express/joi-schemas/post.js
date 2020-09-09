'use strict';

const Joi = require(`joi`);

const createPostSchema = (categories) => {
  const categoryIds = categories.map((it) => it.id);

  return Joi.object({
    title: Joi.string().min(30).max(250).required(),
    announce: Joi.string().min(30).max(250).required(),
    categories: Joi.array().items(Joi.valid(...categoryIds)).min(1).required(),
    date: Joi.string().isoDate(),
    text: Joi.string().max(1000).allow(``).required(),
    picture: Joi.object({
      name: Joi.when(`originalName`, {
        is: Joi.valid(``),
        then: Joi.valid(``),
        otherwise: Joi.string()
      }).required(),
      originalName: Joi.string().allow(``).required()
    }).optional()
  });
};

module.exports = {
  createPostSchema,
};
