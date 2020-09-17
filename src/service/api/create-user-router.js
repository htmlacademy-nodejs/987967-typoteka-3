'use strict';

const {Router} = require(`express`);
const {HttpStatusCode, UserRole} = require(`../const`);
const {createBadRequestException} = require(`../utils`);
const {userSchema, userLoginSchema} = require(`../joi-schemas`);
const {validateSchema} = require(`../middlewares`);

const createUserRouter = (service) => {
  const router = new Router();

  router.post(`/`, validateSchema(userSchema), async (req, res, next) => {
    try {
      const {email} = req.body;
      if (await service.getUserByEmail(email)) {
        throw createBadRequestException([`The user with the same E-mail already exists`]);
      }

      const result = await service.createUser(req.body);
      res.status(HttpStatusCode.CREATE).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.post(`/auth`, validateSchema(userLoginSchema), async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const user = await service.getUserByEmail(email);
      if (!user) {
        throw createBadRequestException([`The user with E-mail: ${email} not found`]);
      }

      const userAuthData = await service.checkUser(email, password);
      if (userAuthData.role === UserRole.UNAUTHORIZED) {
        throw createBadRequestException([`Password incorrect`]);
      }

      res.status(HttpStatusCode.OK).send(userAuthData);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = {
  createUserRouter
};
