'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles, compareHash} = require(`../utils`);
const {UserRole} = require(`../const`);
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

it(`should authentificate user as admin`, async () => {
  const email = `noah.ggeero@test.com`;
  const password = `geNGerooah`;

  const res = await supertest(server).post(`/api/user/auth`).send({email, password});
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    id: `1`,
    firstname: `Noah`,
    lastname: `George`,
    email: `noah.ggeero@test.com`,
    avatar: `ec_Ut`,
    role: UserRole.ADMIN,
  });
});

it(`should authentificate user as not admin`, async () => {
  const email = `phoebe.learhci@test.com`;
  const password = `CPlrhhieabeeo`;

  const res = await supertest(server).post(`/api/user/auth`).send({email, password});

  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    id: `2`,
    firstname: `Phoebe`,
    lastname: `Charlie`,
    email: `phoebe.learhci@test.com`,
    avatar: `vEWwI`,
    role: UserRole.READER,
  });
});

it(`should not authentificate user and return 400 when user not found`, async () => {
  const email = `wrong.learhci@test.com`;
  const password = `CPlrhhieabeeo`;

  const res = await supertest(server).post(`/api/user/auth`).send({email, password});

  expect(res.status).toBe(400);
});

it(`should not authentificate user and return 400 when password is incorrect`, async () => {
  const email = `phoebe.learhci@test.com`;
  const password = `incorrect`;

  const res = await supertest(server).post(`/api/user/auth`).send({email, password});

  expect(res.status).toBe(400);
});
