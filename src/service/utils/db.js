'use strict';

const {Sequelize} = require(`sequelize`);
const {ADMIN, POSTGRES_PSW, HOST, DB_PORT} = require(`../config`);

const getLimitConstrain = (limit, offset = 0) => {
  return limit ? {
    limit,
    offset
  } : {};
};

const createRootSequelize = () => new Sequelize(`postgres`, `postgres`, POSTGRES_PSW, {
  host: HOST,
  port: DB_PORT,
  dialect: `postgres`,
  logging: false,
});

const createDatabase = async (dbName) => {
  const sequelize = createRootSequelize();

  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.dropDatabase(dbName);

  await queryInterface.createDatabase(dbName, {
    collate: `C`,
    encoding: `UTF8`,
    ctype: `C`,
    template: `template0`,
  });

  await sequelize.query(`ALTER DATABASE ${dbName} OWNER TO ${ADMIN};`);

  sequelize.close();
};

const dropDatabase = async (dbName) => {
  const sequelize = createRootSequelize();
  await sequelize.queryInterface.dropDatabase(dbName);
  sequelize.close();
};

module.exports = {
  getLimitConstrain,
  createDatabase,
  dropDatabase,
};
