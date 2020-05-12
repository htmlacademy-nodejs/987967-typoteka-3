'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res, next) => {
  res.send(`/my`);
  next();
});

myRouter.get(`/comments/`, (req, res, next) => {
  res.send(`/my/comments`);
  next();
});

module.exports = {
  myRouter,
};
