'use strict';

const {UserRole} = require(`../const`);

const privateRoute = (req, res, next) => {
  const {user} = req.session;
  if (!user || user.role !== UserRole.ADMIN) {
    res.redirect(`login`);
  } else {
    next();
  }
};

const privateReaderRoute = (req, res, next) => {
  const {user} = req.session;
  if (!user) {
    res.redirect(`login`);
  } else {
    next();
  }
};

module.exports = {
  privateRoute,
  privateReaderRoute,
};
