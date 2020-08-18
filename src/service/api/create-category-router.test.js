'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles} = require(`../utils`);

let server;
let dbName;
let db;

beforeAll(async () => {
  dbName = `test_${Date.now()}`;
  const {users, posts, categories} = await readTestMockFiles();
  db = await createDataBase(dbName, users, categories, posts, true);

  server = createServer(db);
});

afterAll(async () => {
  db.close();
  await dropDataBase(dbName);
});

it(`should return a list of categories with its quantity`, async () => {
  const res = await supertest(server).get(`/api/categories`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    {id: `5`, name: `IT`, count: 3},
    {id: `3`, name: `Без рамки`, count: 1},
    {id: `1`, name: `Деревья`, count: 4},
    {id: `9`, name: `Железо`, count: 0},
    {id: `2`, name: `За жизнь`, count: 3},
    {id: `7`, name: `Кино`, count: 0},
    {id: `6`, name: `Музыка`, count: 1},
    {id: `8`, name: `Программирование`, count: 1},
    {id: `4`, name: `Разное`, count: 3}
  ]);
});

it(`should return a list of posts`, async () => {
  const res = await supertest(server).get(`/api/categories/5`);
  expect(res.status).toBe(200);
});

it(`should return 400`, async () => {
  const res = await supertest(server).get(`/api/categories/five`);
  expect(res.status).toBe(400);
});

it(`should return 200`, async () => {
  const res = await supertest(server).get(`/api/categories/5?limit=2&offset=0`);
  expect(res.status).toBe(200);
});

it(`should return 400`, async () => {
  const res = await supertest(server).get(`/api/categories/5?limit=a&offset=0`);
  expect(res.status).toBe(400);
});
