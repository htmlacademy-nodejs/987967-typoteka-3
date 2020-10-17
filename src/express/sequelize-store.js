'use strict';

const createSequelizeStore = require(`connect-session-sequelize`);
const {Sequelize} = require(`sequelize`);
const {DB_NAME, DB_PORT, PSW, ADMIN, HOST} = require(`./config`);
const {Session} = require(`./const`);


const getSequelizeStore = (storeConstructor) => {
  const SequelizeStore = createSequelizeStore(storeConstructor);
  const db = new Sequelize(DB_NAME, ADMIN, PSW, {
    host: HOST,
    port: DB_PORT,
    dialect: `postgres`,
    logging: false,
  });

  const store = new SequelizeStore({
    db,
    expiration: Session.EXPIRATION,
    checkExpirationInterval: Session.CHECK_INTERVAL,
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
