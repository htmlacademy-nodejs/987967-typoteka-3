'use strict';

const Joi = require(`joi`);
const {UserNameLength, FileNameLength, PasswordLength} = require(`../const`);

const userLogin = {
  email: Joi.string().email().required(),
  password: Joi.string().min(PasswordLength.MIN).required(),
};

const userRegisterSchema = Joi.object({
  ...userLogin,
  firstname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  lastname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  repeatPassword: Joi.ref(`password`),

  originalName: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX).allow(``),
  fileName: Joi.string().min(FileNameLength.MIN).max(FileNameLength.MAX).allow(``),
  avatarFile: Joi.string().allow(``),
});

const userLoginSchema = Joi.object({
  ...userLogin
});


module.exports = {
  userLoginSchema,
  userRegisterSchema,
};
