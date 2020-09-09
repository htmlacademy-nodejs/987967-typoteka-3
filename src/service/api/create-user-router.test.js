'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles, compareHash} = require(`../utils`);
const {DB} = require(`../db`);

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

it(`should return status 201 and user plain object`, async () => {
  const userData = {
    email: `test@email.com`,
    firstname: `Gerald`,
    lastname: `Bostock`,
    avatar: {
      name: `1599058102203`,
      originalName: `Gerald-Bostock.jpg`
    },
    password: `GeraldBostock`
  };

  const plainUser = {
    id: `4`,
    email: `test@email.com`,
    firstname: `Gerald`,
    lastname: `Bostock`,
    avatar: {
      id: `4`,
      name: `1599058102203`,
      originalName: `Gerald-Bostock.jpg`,
      [`user_id`]: `4`
    }
  };

  const dbResult = {
    id: `4`,
    email: `test@email.com`,
    firstname: `Gerald`,
    lastname: `Bostock`
  };

  const res = await supertest(server).post(`/api/user`).send(userData);
  const user = {...res.body};
  delete user.password;

  expect(res.status).toBe(201);
  expect(user).toEqual(plainUser);
  expect(compareHash(userData.password, res.body.password.password)).toBeTruthy();
  expect(await db.getUserByEmail(`test@email.com`)).toEqual(dbResult);
});

it(`should return 400 when user data is not valid`, async () => {
  await supertest(server).post(`/api/user`).send({
    email: `test@email.com`,
    firstname: `Gerald`,
    lastname: `Bostock`,
    avatar: {
      name: `1599058102204`,
      originalName: `Gerald-Bostock.jpg`
    },
    password: `GeraldBostock`
  });

  const res = await Promise.all([
    supertest(server).post(`/api/user`).send({
      email: `test@email.com`,
      firstname: `Gerald`,
      lastname: `Bostock`,
      avatar: {
        name: `1599058102204`,
        originalName: `Gerald-Bostock.jpg`
      },
      password: `GeraldBostock`
    }),
    supertest(server).post(`/api/user`).send({
      firstname: `Gerald`,
      lastname: `Bostock`,
      avatar: {
        name: `1599058102204`,
        originalName: `Gerald-Bostock.jpg`
      },
      password: `GeraldBostock`
    }),
    supertest(server).post(`/api/user`).send({
      email: `test2@email.com`,
      firstname: `Gerald`,
      lastname: `Bostock`,
      avatar: {
        name: `1599058102204`,
      },
      password: `GeraldBostock`
    }),
    supertest(server).post(`/api/user`).send({
      email: `test2@email.com`,
      firstname: `Gerald`,
      avatar: {
        name: `1599058102204`,
        originalName: `Gerald-Bostock.jpg`
      },
      password: `GeraldBostock`
    }),
  ]);

  const statuses = res.map((it) => it.status);
  expect(statuses).toEqual([400, 400, 400, 400]);
});
