'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const {UserFormType} = require(`../const`);
const {render} = require(`../utils`);
const {userLoginSchema} = require(`../joi-schemas`);
const {DataServer} = require(`../data-server`);
const {validateBodySchema} = require(`../middlewares`);

const loginRouter = new Router();
const dataServer = new DataServer();

loginRouter.get(`/`, (req, res) => {
  const {logout} = req.query;
  const logoutSchema = Joi.boolean().optional();

  if (!logoutSchema.validate(logout).error && logout === `true`) {
    req.session.destroy();
  }

  render(`login`, {
    activeForm: UserFormType.LOGIN,
    // formData: {},
  }, req, res);
});

loginRouter.post(`/`, validateBodySchema(userLoginSchema, `login`, {activeForm: UserFormType.LOGIN}), async (req, res, next) => {
  const {email} = req.body;

  try {
    const authData = await dataServer.authUser(req.body);
    req.session.user = authData;
    res.redirect(`/`);
  } catch (err) {
    if (err.isDBServer) {
      const errors = {email: err.errors.filter(((it) => /mail/i.test(it))), password: err.errors.filter((it) => /password/i.test(it))};

      render(`login`, {
        activeForm: UserFormType.LOGIN,
        formData: {email},
        errors
      }, req, res);
      return;
    }

    next(err);
  }
});

module.exports = {
  loginRouter,
};
