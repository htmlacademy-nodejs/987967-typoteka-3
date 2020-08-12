'use strict';

const Joi = require(`joi`);

const postSchema = Joi.object({
  title: Joi.string().min(30).max(250).required(),
  announce: Joi.string().min(30).max(250).required(),
  categories: Joi.array().items(Joi.string()).min(1).required(),
  date: Joi.string().isoDate(),
  text: Joi.string().max(1000).allow(``).optional(),
  picture: Joi.string(),
  originalPicture: Joi.string().when(`picture`, {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
});

module.exports = {
  postSchema,
};
