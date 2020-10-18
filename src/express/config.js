'use strict';

require(`dotenv`).config();

module.exports = {
  SECRET: process.env.TK_SECRET,
  DB_NAME: process.env.TK_DBNAME,
  DB_PORT: process.env.TK_DB_PORT,
  ADMIN: process.env.TK_ADMIN,
  PSW: process.env.TK_PSW,
  HOST: process.env.TK_EXPRESS_HOST,
  SERVICE_HOST: process.env.TK_SERVICE_HOST,
  PORT: process.env.TK_EXPRESS_PORT,
  SERVICE_PORT: process.env.TK_SERVICE_PORT,
};
