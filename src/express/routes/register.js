'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {validateBodySchema} = require(`../middlewares`);
const {UserFormType} = require(`../const`);
const {dataServer} = require(`../data-server`);
const {userRegisterSchema} = require(`../joi-schemas`);
const {extractPicture, render} = require(`../utils`);

const registerRouter = new Router();
const upload = multer({dest: `src/express/public/img/avatars`});


registerRouter.get(`/`, (req, res) => {
  render(`login`, {
    activeForm: UserFormType.REGISTER,
  }, req, res);
});

registerRouter.post(`/`, [upload.single(`avatarFile`), validateBodySchema(userRegisterSchema, `login`, {activeForm: UserFormType.REGISTER})], async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body;
  const avatar = extractPicture(req);

  try {
    await dataServer.createUser({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    res.redirect(`/login`);
  } catch (err) {
    if (err.isDBServer) {
      render(`login`, {
        activeForm: UserFormType.REGISTER,
        allErrors: err.errors,
        formData: {
          firstname,
          lastname,
          email,
          fileName: avatar.name,
          originalName: avatar.originalName
        },
      }, req, res);
    } else {
      next(err);
    }
  }
});

module.exports = {
  registerRouter,
};
