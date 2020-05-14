'use strict';

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (req, res, next) => {
  res.render(`login`);
  next();
});

module.exports = {
  registerRouter,
};
