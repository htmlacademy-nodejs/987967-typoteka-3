'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res, next) => {
  res.render(`my`);
  next();
});

myRouter.get(`/comments`, (req, res, next) => {
  res.render(`comments`);
  next();
});

module.exports = {
  myRouter,
};
