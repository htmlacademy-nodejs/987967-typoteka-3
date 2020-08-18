'use strict';

const fs = require(`fs`);
const {Client} = require(`pg`);
const {ADMIN, PSW, POSTGRES_PSW, HOST, DB_PORT} = require(`../config`);

const addPagination = (limit, offset = 0) => {
  return limit ? {
    limit,
    offset
  } : {};
};

const createSchemaCommands = (file) => fs.readFileSync(file).toString().split(`;`).map((it) => `${it.trim()};`);

const dropDataBase = async (dbName) => {
  const client = new Client({
    user: `postgres`,
    host: HOST,
    database: `postgres`,
    password: POSTGRES_PSW,
    port: DB_PORT
  });

  try {
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${dbName};`);
  } catch (err) {
    client.end();
    throw err;
  }

  await client.end();
};

const createEmptyDataBase = async ({dbName, owner, host, port, postgresPassword}) => {
  const client = new Client({
    user: `postgres`,
    host,
    database: `postgres`,
    password: postgresPassword,
    port
  });

  try {
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${dbName};`);
    await client.query(`
    CREATE DATABASE ${dbName}
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE template0
    CONNECTION LIMIT = -1;`);

    await client.query(`ALTER DATABASE ${dbName} OWNER TO ${owner};`);
  } catch (err) {
    client.end();
    throw err;
  }

  await client.end();
};

const createSchema = async ({dbName, admin, password, host, port}) => {
  const client = new Client({
    user: admin,
    host,
    database: dbName,
    password,
    port
  });

  const commands = createSchemaCommands(`${process.cwd()}/sql/create-schema.sql`);
  try {
    await client.connect();
    for (let i = 0; i < commands.length; i++) {
      await client.query(commands[i]);
    }
  } catch (err) {
    client.end();
    throw err;
  }

  client.end();
};

const createDataBase = async (dbName) => {
  await createEmptyDataBase({
    dbName,
    owner: ADMIN,
    host: HOST,
    port: DB_PORT,
    postgresPassword: POSTGRES_PSW
  });

  await createSchema({
    dbName,
    admin: ADMIN,
    password: PSW,
    host: HOST,
    port: DB_PORT
  });
};

module.exports = {
  addPagination,
  createSchemaCommands,
  createEmptyDataBase,
  createSchema,
  createDataBase,
  dropDataBase,
};
