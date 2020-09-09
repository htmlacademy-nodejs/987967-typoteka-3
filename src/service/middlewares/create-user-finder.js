'use strict';

const Joi = require(`joi`);
const {createBadRequestException} = require(`../utils`);

const createUserFinder = (service) => async (req, res, next) => {
  try {
    const {userId} = req.body;
    await Joi.number().required().validateAsync(userId);

    const user = await service.getUser(userId);
    if (!user) {
      const message = `Can't find user with ID='${userId}'`;
      throw createBadRequestException([message]);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserFinder
};
