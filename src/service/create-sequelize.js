'use strict';

const {Sequelize} = require(`sequelize`);
const {HOST, DBNAME, ADMIN, PSW} = require(`./config`);
const models = require(`./models`);

const createSequelize = async (dbName = DBNAME, admin = ADMIN, psw = PSW, silent = false) => {
  const sequelize = new Sequelize(dbName, admin, psw, {
    host: HOST,
    dialect: `postgres`,
    logging: silent ? false : console.log,
    define: {
      timestamps: false,
    },
  });

  const modelList = Object.values(models);

  modelList.forEach((it) => {
    it.init(sequelize);
  });

  modelList.forEach((it) => {
    if (it.associate) {
      it.associate(models);
    }
  });

  await sequelize.authenticate();

  return sequelize;
};

module.exports = {
  createSequelize,
};

