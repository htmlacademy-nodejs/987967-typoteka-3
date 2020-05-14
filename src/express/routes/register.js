'use strict';

const {Router} = require(`express`);

const registerRouter = new Router();

registerRouter.get(`/`, (req, res, next) => {
  res.send(`/register`);
  next();
});

module.exports = {
  registerRouter,
};
