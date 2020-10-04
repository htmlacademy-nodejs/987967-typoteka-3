'use strict';

require(`dotenv`).config();

module.exports = {
  DBNAME: process.env.TK_DBNAME,
  ADMIN: process.env.TK_ADMIN,
  PSW: process.env.TK_PSW,
  HOST: process.env.TK_HOST,
  POSTGRES_PSW: process.env.TK_POSTGRES_PSW,
  DB_PORT: process.env.TK_DB_PORT,
  SERVICE_SOCKET_PORT: process.env.TK_SERVICE_SOCKET_PORT,
};
