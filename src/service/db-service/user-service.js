'use strict';

const {Sequelize} = require(`sequelize`);
const {User} = require(`../models`);
const {getHash, compareHash} = require(`../utils`);
const {UserRole} = require(`../const`);

const prepareUserData = async ({email, firstname, lastname, password, avatar, originalAvatar}) => {
  const userData = {email, firstname, lastname};
  const avatarData = {name: avatar, originalName: originalAvatar};
  const passwordData = {
    password: await getHash(password),
  };

  userData.avatar = avatarData;
  userData.password = passwordData;

  return userData;
};

const createUser = async (data) => {
  data.password = {
    password: await getHash(data.password)
  };

  const user = await User.sequelize.transaction(async (t) => {
    return User.create(data, {
      include: [User.Avatar, User.Password],
      transaction: t
    });
  });

  return user.get({plain: true});
};

const createUsers = async (data) => {
  const userData = await Promise.all(data.map((it) => prepareUserData(it)));

  return User.bulkCreate(userData, {
    include: [User.Avatar, User.Password]
  });
};

const getUser = async (id) => {
  const user = await User.findByPk(id);
  return user ? user.get({plain: true}) : null;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {email}
  });

  return user ? user.get({plain: true}) : null;
};

let adminId;
const getAdminId = async () => {
  if (!adminId) {
    const users = await User.findAll({
      attributes: [[Sequelize.fn(`min`, Sequelize.col(`id`)), `adminId`]],
    });

    adminId = users[0].get({plain: true}).adminId;
  }

  return adminId;
};

const checkUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return {role: UserRole.UNAUTHORIZED};
  }

  const {id, lastname, firstname, avatar, password: passwordData} = (await User.findOne({
    attributes: [`id`, `firstname`, `lastname`],
    include: [{
      association: User.Avatar,
      attributes: [`name`]
    }, {
      association: User.Password,
    }],
    where: {email}
  })).get({plain: true});

  const passwordIsRight = await compareHash(password, passwordData.password);

  if (!passwordIsRight) {
    return {role: UserRole.UNAUTHORIZED};
  }

  return {
    id,
    firstname,
    lastname,
    email,
    avatar: avatar ? avatar.name : null,
    role: id === await getAdminId() ? UserRole.ADMIN : UserRole.READER
  };
};

module.exports = {
  createUser,
  createUsers,
  getUser,
  getUserByEmail,
  checkUser,
};
