'use strict';

require(`dotenv`).config();

module.exports = {
  SECRET: process.env.TK_SECRET,
  DBNAME: process.env.TK_DBNAME,
  ADMIN: process.env.TK_ADMIN,
  PSW: process.env.TK_PSW,
  HOST: process.env.TK_HOST,
};
