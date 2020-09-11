'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const {UserFormType} = require(`../const`);
const {splitJoiException} = require(`../utils`);
const {userLoginSchema} = require(`../joi-schemas`);
const {DataServer} = require(`../data-server`);

const loginRouter = new Router();
const dataServer = new DataServer();

loginRouter.get(`/`, (req, res) => {
  const {logout} = req.query;
  const logoutSchema = Joi.boolean().optional();

  if (!logoutSchema.validate(logout).error && logout === `true`) {
    req.session.user = null;
  }

  res.render(`login`, {
    activeForm: UserFormType.LOGIN
  });
});

loginRouter.post(`/`, async (req, res, next) => {
  const {email} = req.body;

  try {
    await userLoginSchema.validateAsync(req.body, {abortEarly: false});

    const authData = await dataServer.authUser(req.body);
    req.session.user = authData;
    res.redirect(`/`);
  } catch (err) {
    if (err.isJoi) {
      res.render(`login`, {
        activeForm: UserFormType.LOGIN,
        email,
        errors: splitJoiException(err)
      });
      return;
    }

    if (err.isDBServer) {
      const errors = {email: err.errors.filter(((it) => /mail/i.test(it))), password: err.errors.filter((it) => /password/i.test(it))};

      res.render(`login`, {
        activeForm: UserFormType.LOGIN,
        email,
        errors
      });
      return;
    }

    next(err);
  }
});

module.exports = {
  loginRouter,
};
