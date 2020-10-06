'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles, readJsonFile} = require(`../utils`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-service`);
const {ADMIN, PSW} = require(`../config`);

const allComments = readJsonFile(`${process.cwd()}/data/mock-for-test/results/all-comments.json`);

let server;
let dbName;
let sequelize;

beforeAll(async () => {
  dbName = `test_${Date.now()}`;
  const {users, posts, categories} = await readTestMockFiles();

  await createDataBase(dbName);
  sequelize = await createSequelize(dbName, ADMIN, PSW, true);
  await db.fillDataBase(sequelize, posts, users, categories);

  server = createServer(db);
});

afterAll(async () => {
  if (sequelize) {
    sequelize.close();
  }
  await dropDataBase(dbName);
});

it(`should return a list of all comments`, async () => {
  const res = await supertest(server).get(`/api/comments`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(allComments);
});

it(`should return first two comments from list of all comments`, async () => {
  const res = await supertest(server).get(`/api/comments?limit=2`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(allComments.slice(0, 2));
});

it(`should return 2, 3 and 4 comments from list of all comments`, async () => {
  const res = await supertest(server).get(`/api/comments?limit=3&offset=1`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(allComments.slice(1, 4));
});

it(`should return 400 when query param is not a number`, async () => {
  const res = await supertest(server).get(`/api/comments?limit=wrong`);
  expect(res.status).toBe(400);
});
