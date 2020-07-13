'use strict';

const Sequelize = require(`sequelize`);
const {DBNAME, ADMIN, PSW, HOST} = require(`./config`);

const sequelize = new Sequelize(DBNAME, ADMIN, PSW, {
  host: HOST,
  dialect: `postgres`
});

module.exports = {
  sequelize,
};
