'use strict';

const {userRegisterSchema} = require(`../joi-schemas`);
const {UserFormType} = require(`../const`);
const {parseJoiException} = require(`../utils`);

const validateUserData = async (req, res, next) => {
  const {firstname, lastname, email, password, repeatPassword, originalAvatar, avatar} = req.body;
  const storedAvatarData = originalAvatar && avatar ? {
    originalName: originalAvatar,
    name: avatar
  } : null;

  const uploadAvatar = req.file ? {
    originalName: req.file.originalname,
    name: req.file.filename
  } : null;

  const avatarData = uploadAvatar || storedAvatarData;

  try {
    res.locals.userData = await userRegisterSchema.validateAsync({
      firstname,
      lastname,
      email,
      password,
      repeatPassword,
      avatar: avatarData
    }, {abortEarly: false});

    next();
  } catch (err) {
    if (err.isJoi) {
      res.render(`login`, {
        activeForm: UserFormType.REGISTER,
        errors: parseJoiException(err),
        firstname,
        lastname,
        email,
        avatar: avatarData
      });
    } else {
      next(err);
    }
  }
};

module.exports = {
  validateUserData,
};
