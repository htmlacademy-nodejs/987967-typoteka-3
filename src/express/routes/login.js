'use strict';

const {Router} = require(`express`);
const {UserFormType} = require(`../const`);

const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  res.render(`login`, {
    activeForm: UserFormType.LOGIN
  });
});

module.exports = {
  loginRouter,
};
