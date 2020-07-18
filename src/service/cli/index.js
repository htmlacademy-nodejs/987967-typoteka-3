'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);
const generateSQL = require(`./generate-sql`);
const generateDB = require(`./generate-db`);

module.exports = {
  Cli: {
    [generate.name]: generate,
    [help.name]: help,
    [version.name]: version,
    [server.name]: server,
    [generateSQL.name]: generateSQL,
    [generateDB.name]: generateDB,
  }
};
