'use strict';

const Joi = require(`joi`);
const {UserNameLength, FileNameLength, PasswordLength} = require(`../const`);

const userLogin = {
  email: Joi.string().email().required().messages({
    [`string.email`]: `Невалидный адрес электронной почты`
  }),
  password: Joi.string().min(PasswordLength.MIN).required().messages({
    [`string.min`]: `Длина пароля должна быть не менее 6 символов`,
    [`any.required`]: `Пароль - обязательное поле`
  }),
};

const getNameMessages = (isFirstName) => {
  const nameType = isFirstName ? `Имя` : `Фамилия`;
  return {
    [`string.min`]: `${nameType} должно быть не менее ${UserNameLength.MIN} символов`,
    [`string.max`]: `${nameType} должно быть не более ${UserNameLength.MAX} символов`,
    [`string.pattern.base`]: `${nameType} может состоять из букв, дефисов и пробелов`,
  };
};

const userRegisterSchema = Joi.object({
  ...userLogin,
  firstname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required().messages(getNameMessages(true)),
  lastname: Joi.string().pattern(/^[a-zа-я \-]+$/i).min(UserNameLength.MIN).max(UserNameLength.MAX).required().messages(getNameMessages(false)),
  repeatPassword: Joi.valid(Joi.ref(`password`)).required().messages({[`any.only`]: `Поле пароль и повтор пароля должны совпадать`}),

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
