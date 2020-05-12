'use strict';

const {Router} = require(`express`);

const loginRouter = new Router();

loginRouter.get(`/`, (req, res, next) => {
  res.render(`login`);
  next();
});

module.exports = {
  loginRouter,
};
