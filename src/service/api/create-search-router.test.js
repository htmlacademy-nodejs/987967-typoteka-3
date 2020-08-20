'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles, readJsonFile} = require(`../utils`);
const {DB} = require(`../db`);

const searchResult = readJsonFile(`${process.cwd()}/data/mock-for-test/results/search.json`);

let server;
let dbName;
let db;

beforeAll(async () => {
  dbName = `test_${Date.now()}`;
  const {users, posts, categories} = await readTestMockFiles();
  await createDataBase(dbName);

  db = new DB(dbName, undefined, undefined, true);
  await db.fillDataBase(posts, users, categories);

  server = createServer(db);
});

afterAll(async () => {
  db.close();
  await dropDataBase(dbName);
});

it(`should return an empty array if the query string donesn't match any title of posts`, async () => {
  const res = await supertest(server).get(`/api/search?query=AAA`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual([]);
});

it(`should return a list of posts whoes title matches the query string`, async () => {
  const res = await supertest(server).get(`/api/search?query=%D0%91%D0%B8%D0%BB%D0%BB%D1%8C`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(searchResult);
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
