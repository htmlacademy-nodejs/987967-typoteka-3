'use strict';

require(`dotenv`).config();

module.exports = {
  DBNAME: process.env.TK_DBNAME,
  ADMIN: process.env.TK_ADMIN,
  PSW: process.env.TK_PSW,
  HOST: process.env.TK_HOST,
};
