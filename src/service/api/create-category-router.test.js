'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles} = require(`../utils`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-service`);
const {ADMIN, PSW} = require(`../config`);

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

it(`should return a list of categories with its quantity`, async () => {
  const res = await supertest(server).get(`/api/categories`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    {id: `5`, name: `IT`, count: 3},
    {id: `3`, name: `Без рамки`, count: 1},
    {id: `1`, name: `Деревья`, count: 4},
    {id: `9`, name: `Железо`, count: 0},
    {id: `2`, name: `За жизнь`, count: 3},
    {id: `10`, name: `Категория без постов`, count: 0},
    {id: `7`, name: `Кино`, count: 0},
    {id: `6`, name: `Музыка`, count: 1},
    {id: `8`, name: `Программирование`, count: 1},
    {id: `4`, name: `Разное`, count: 3}
  ]);
});

it(`should return a list of categories with its quantity excluded empty`, async () => {
  const res = await supertest(server).get(`/api/categories?excludeEmpty=true`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    {id: `5`, name: `IT`, count: 3},
    {id: `3`, name: `Без рамки`, count: 1},
    {id: `1`, name: `Деревья`, count: 4},
    {id: `2`, name: `За жизнь`, count: 3},
    {id: `6`, name: `Музыка`, count: 1},
    {id: `8`, name: `Программирование`, count: 1},
    {id: `4`, name: `Разное`, count: 3}
  ]);
});

it(`should return 400 if query parameter excludeEmpty is wrong`, async () => {
  const res = await supertest(server).get(`/api/categories?excludeEmpty=wrong`);
  expect(res.status).toBe(400);
});

it(`should return a list of posts`, async () => {
  const res = await supertest(server).get(`/api/categories/5`);
  expect(res.status).toBe(200);
});

it(`should return 400 when :categoryId is not a number`, async () => {
  let res = await supertest(server).get(`/api/categories/five`);
  expect(res.status).toBe(400);
  res = await supertest(server).delete(`/api/categories/five`);
  expect(res.status).toBe(400);
  res = await supertest(server).put(`/api/categories/five`);
  expect(res.status).toBe(400);
});

it(`should return 400 when a query parameter is not a number`, async () => {
  const res = await supertest(server).get(`/api/categories/5?limit=wrong&offset=0`);
  expect(res.status).toBe(400);
});

it(`should return 200 and list of 3 posts`, async () => {
  const res = await supertest(server).get(`/api/categories/5`);
  expect(res.status).toBe(200);
  expect(res.body.posts).toHaveLength(3);

  const titles = [`Поросенок и перец`, `Билль вылетает в трубу`, `Бег по кругу и длинный рассказ`];
  expect(res.body.posts.map((it) => it.title)).toEqual(titles);
});

it(`should return 200 and list of 1 post`, async () => {
  const res = await supertest(server).get(`/api/categories/5?limit=1&offset=0`);
  expect(res.status).toBe(200);
  expect(res.body.posts).toHaveLength(1);

  const titles = [`Поросенок и перец`];
  expect(res.body.posts.map((it) => it.title)).toEqual(titles);
});

it(`should return 200 and delete a category`, async () => {
  const res = await supertest(server).delete(`/api/categories/10`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(`10`);

  const resCategories = await supertest(server).get(`/api/categories/10`);
  expect(resCategories.status).toBe(400);
});

it(`should return 400 when category data is not valid`, async () => {
  let res = await supertest(server).put(`/api/categories/1`).send({name: `a`});
  expect(res.status).toBe(400);
  res = await supertest(server).post(`/api/categories`).send({name: `1234567890 1234567890 1234567890`});
  expect(res.status).toBe(400);
});

it(`should return 200 and change a category name`, async () => {
  const newName = `Новое имя`;
  let res = await supertest(server).put(`/api/categories/1`).send({name: newName});
  expect(res.status).toBe(200);
  res = await supertest(server).get(`/api/categories`);
  const updatedCategory = res.body.find((it) => it.id === `1`);
  expect(updatedCategory.name).toBe(newName);
});

it(`should return 201 and create a new category`, async () => {
  const newName = `Новое имя категории`;
  let res = await supertest(server).post(`/api/categories`).send({name: newName});
  expect(res.status).toBe(201);
  res = await supertest(server).get(`/api/categories`);
  const updatedCategory = res.body.find((it) => it.name === newName);
  expect(updatedCategory).toBeDefined();
});

