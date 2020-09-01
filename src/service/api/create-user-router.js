'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../const`);
const {getValidationException} = require(`../utils`);
const {userSchema} = require(`../joi-schemas`);

const createUserRouter = (service) => {
  const router = new Router();

  router.post(`/`, async (req, res, next) => {
    try {
      const userData = await userSchema.validateAsync(req.body);

      if (await service.getUserByEmail(userData.email)) {
        throw getValidationException([`The user with the same E-mail already exists`]);
      }

      const result = await service.createUser(userData);
      res.status(HttpStatusCode.CREATE).json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createUserRouter
};
