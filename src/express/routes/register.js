'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {validateUserData} = require(`../middlewares`);
const {UserFormType} = require(`../const`);
const {DataServer} = require(`../data-server`);

const registerRouter = new Router();
const upload = multer({dest: `src/express/public/img/avatars`});
const dataServer = new DataServer();

registerRouter.get(`/`, (req, res) => {
  res.render(`login`, {
    activeForm: UserFormType.REGISTER,
  });
});

registerRouter.post(`/`, [upload.single(`avatarFile`), validateUserData], async (req, res, next) => {
  const {userData} = res.locals;
  const {firstname, lastname, email, avatar, password} = userData;
  try {
    await dataServer.createUser({
      firstname,
      lastname,
      email,
      password,
      avatar
    });

    res.redirect(`/login`);
  } catch (err) {
    if (err.isDBServer) {
      res.render(`login`, {
        activeForm: UserFormType.REGISTER,
        errors: err.errors,
        firstname,
        lastname,
        email,
        avatar
      });
    } else {
      next(err);
    }
  }
});

module.exports = {
  registerRouter,
};
