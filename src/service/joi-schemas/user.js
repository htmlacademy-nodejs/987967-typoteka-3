'use strict';

const Joi = require(`joi`);
const {PasswordLength} = require(`../const`);

const userSchema = Joi.object({
  email: Joi.string().max(250).email().required(),
  firstname: Joi.string().max(250).required(),
  lastname: Joi.string().max(250).required(),

  avatar: Joi.object({
    originalName: Joi.string().max(250).required(),
    name: Joi.string().max(100).required(),
  }).allow(null),

  password: Joi.string().min(PasswordLength.MIN).max(PasswordLength.MAX).required()
});

module.exports = {
  userSchema,
};
