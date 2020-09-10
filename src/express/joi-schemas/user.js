'use strict';

const Joi = require(`joi`);
const {UserNameLength} = require(`../const`);

const userLogin = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

const userRegisterSchema = Joi.object({
  ...userLogin,
  firstname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  lastname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required(),
  repeatPassword: Joi.ref(`password`),
  avatar: Joi.object({
    originalName: Joi.string().max(250).required(),
    name: Joi.string().max(100).required(),
  }).allow(null),
});

const userLoginSchema = Joi.object({
  ...userLogin
});


module.exports = {
  userLoginSchema,
  userRegisterSchema,
};
