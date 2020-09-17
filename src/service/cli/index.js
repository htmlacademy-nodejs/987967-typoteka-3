'use strict';

const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);
const generateJSON = require(`./generate-json`);
const generateSQL = require(`./generate-sql`);
const generateDB = require(`./generate-db`);

module.exports = {
  Cli: {
    [help.name]: help,
    [version.name]: version,
    [server.name]: server,
    [generateJSON.name]: generateJSON,
    [generateSQL.name]: generateSQL,
    [generateDB.name]: generateDB,
  }
};
