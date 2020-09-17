'use strict';

const createSequelizeStore = require(`connect-session-sequelize`);
const {Sequelize} = require(`sequelize`);
const {DBNAME, PSW, ADMIN, HOST} = require(`./config`);


const getSequelizeStore = (storeConstructor) => {
  const SequelizeStore = createSequelizeStore(storeConstructor);
  const db = new Sequelize(DBNAME, ADMIN, PSW, {
    host: HOST,
    dialect: `postgres`,
    logging: false,
  });

  const store = new SequelizeStore({
    db,
    expiration: 24 * 60 * 60 * 1000,
    checkExpirationInterval: 10 * 60 * 1000,
  });

  try {
    (async () => {
      await db.authenticate();
      await db.sync({force: false});
    })();
  } catch (err) {
    console.log(err);
  }

  return store;
};

module.exports = {
  getSequelizeStore,
};
