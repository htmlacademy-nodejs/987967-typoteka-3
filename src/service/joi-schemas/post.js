'use strict';

const Joi = require(`joi`);

const postSchema = Joi.object({
  title: Joi.string().min(30).max(250).required(),
  announce: Joi.string().min(30).max(250).required(),
  categories: Joi.array().items(Joi.number()).min(1).required(),
  date: Joi.string().isoDate(),
  text: Joi.string().max(1000).allow(``).optional(),
  picture: Joi.object({
    name: Joi.string().when(`originalName`, {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
    originalName: Joi.string()
  }).optional().allow(null)
});

module.exports = {
  postSchema,
};
