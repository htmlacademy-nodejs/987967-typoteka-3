'use strict';

const supertest = require(`supertest`);
const {createApp} = require(`../cli/server`);
const {createDatabase, dropDatabase, readTestMockFiles, readJsonFile} = require(`../utils`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-service`);
const {ADMIN, PSW} = require(`../config`);

const searchResult = readJsonFile(`${process.cwd()}/data/mock-for-test/results/search.json`);

let server;
let dbName;
let sequelize;

beforeAll(async () => {
  dbName = `test_${Date.now()}`;
  const {users, posts, categories} = await readTestMockFiles();

  await createDatabase(dbName);
  sequelize = await createSequelize(dbName, ADMIN, PSW, true);
  await db.fillDatabase(sequelize, posts, users, categories);

  server = createApp(db);
});

afterAll(async () => {
  if (sequelize) {
    sequelize.close();
  }
  await dropDatabase(dbName);
});

it(`should return an empty array if the query string donesn't match any title of posts`, async () => {
  const res = await supertest(server).get(`/api/search?query=AAA`);
  const {status, body} = res;
  expect(status).toBe(200);
  expect(body).toEqual([]);
});

it(`should return a list of posts whoes title matches the query string`, async () => {
  const res = await supertest(server).get(`/api/search?query=%D0%91%D0%B8%D0%BB%D0%BB%D1%8C`);
  const {status, body} = res;
  expect(status).toBe(200);
  expect(body).toEqual(searchResult);
});

it(`should return 400 when query string is not valid`, async () => {
  const res = await Promise.all([
    supertest(server).get(`/api/search`),
    supertest(server).get(`/api/search?`),
    supertest(server).get(`/api/search?q=text`),
    supertest(server).get(`/api/search?query=text&text=query`),
  ]);

  const statuses = res.map((it) => it.status);
  expect(statuses).toEqual([400, 400, 400, 400]);
});
