'use strict';

const Joi = require(`joi`);
const {FileNameLength, UserNameLength, PasswordLength} = require(`../const`);

const userLogin = {
  email: Joi.string().email().required(),
  password: Joi.string().min(PasswordLength.MIN).max(PasswordLength.MAX).required(),
};

const userLoginSchema = Joi.object({
  ...userLogin
});

const userSchema = Joi.object({
  ...userLogin,
  firstname: Joi.string().min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  lastname: Joi.string().min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  avatar: Joi.object({
    originalName: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX).required(),
    name: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX).required(),
  }).allow(null),
});

module.exports = {
  userSchema,
  userLoginSchema,
};
