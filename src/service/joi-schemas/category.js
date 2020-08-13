'use strict';

const Joi = require(`joi`);

const categorySchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
});

module.exports = {
  categorySchema,
};
