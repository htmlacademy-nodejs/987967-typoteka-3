'use strict';

const {Sequelize} = require(`sequelize`);
const {HOST, DB_NAME, ADMIN, PSW, DB_PORT} = require(`./config`);
const models = require(`./models`);

const createSequelize = async (dbName = DB_NAME, admin = ADMIN, psw = PSW, silent = false) => {
  const sequelize = new Sequelize(dbName, admin, psw, {
    host: HOST,
    port: DB_PORT,
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

