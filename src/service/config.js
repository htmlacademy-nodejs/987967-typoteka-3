'use strict';

require(`dotenv`).config();

module.exports = {
  DB_NAME: process.env.TK_DBNAME,
  ADMIN: process.env.TK_ADMIN,
  PSW: process.env.TK_PSW,
  HOST: process.env.TK_SERVICE_HOST,
  PORT: process.env.TK_SERVICE_PORT,
  POSTGRES_PSW: process.env.TK_POSTGRES_PSW,
  DB_PORT: process.env.TK_DB_PORT,
};
