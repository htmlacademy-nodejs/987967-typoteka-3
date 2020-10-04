'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {createDataBase, dropDataBase, readTestMockFiles, readJsonFile} = require(`../utils`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-services`);
const {ADMIN, PSW} = require(`../config`);

const allPostSortedDate = readJsonFile(`${process.cwd()}/data/mock-for-test/results/all-posts-sorted-date.json`);
const allPostSortedPopularity = readJsonFile(`${process.cwd()}/data/mock-for-test/results/all-posts-sorted-popularity.json`);
const post1 = readJsonFile(`${process.cwd()}/data/mock-for-test/results/post-1.json`);
const post10Comments = readJsonFile(`${process.cwd()}/data/mock-for-test/results/post-10-comments.json`);

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

it(`should return status 400 when :postId or :commentId are not a numbers`, async () => {
  const res = await Promise.all([
    supertest(server).get(`/api/articles/wrong`),
    supertest(server).delete(`/api/articles/wrong`),
    supertest(server).put(`/api/articles/wrong`),
    supertest(server).post(`/api/articles/wrong/comments`),
    supertest(server).get(`/api/articles/wrong/comments`),
    supertest(server).delete(`/api/articles/wrong/comments/1`),
    supertest(server).delete(`/api/articles/1/comments/wrong`),
  ]);

  const statuses = res.map((it) => it.status);

  expect(statuses).toEqual([400, 400, 400, 400, 400, 400, 400]);
});

it(`should return a list of all posts sorted by popularity`, async () => {
  const res = await supertest(server).get(`/api/articles`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(allPostSortedPopularity);
});

it(`should return a list of all posts sorted by date`, async () => {
  const res = await supertest(server).get(`/api/articles?sorting=date`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(allPostSortedDate);
});

it(`should return first 5 posts of list of all posts sorted by popularity`, async () => {
  const res = await supertest(server).get(`/api/articles?limit=5`);
  expect(res.status).toBe(200);
  expect(res.body.posts.map((it) => it.id)).toEqual(allPostSortedPopularity.posts.slice(0, 5).map((it) => it.id));
  expect(res.body.total).toBe(allPostSortedPopularity.total);
});

it(`should return 2, 3 and 4 posts of list of all posts sorted by popularity`, async () => {
  const res = await supertest(server).get(`/api/articles?limit=3&offset=1`);
  expect(res.status).toBe(200);
  expect(res.body.posts.map((it) => it.id)).toEqual(allPostSortedPopularity.posts.slice(1, 4).map((it) => it.id));
  expect(res.body.total).toBe(allPostSortedPopularity.total);
});

it(`should return first 5 posts of list of all posts sorted by Date`, async () => {
  const res = await supertest(server).get(`/api/articles?limit=5&sorting=date`);
  expect(res.status).toBe(200);
  expect(res.body.posts.map((it) => it.id)).toEqual(allPostSortedDate.posts.slice(0, 5).map((it) => it.id));
  expect(res.body.total).toBe(allPostSortedDate.total);
});

it(`should return 2, 3 and 4 posts of list of all posts sorted by Date`, async () => {
  const res = await supertest(server).get(`/api/articles?limit=3&offset=1&sorting=date`);
  expect(res.status).toBe(200);
  expect(res.body.posts.map((it) => it.id)).toEqual(allPostSortedDate.posts.slice(1, 4).map((it) => it.id));
  expect(res.body.total).toBe(allPostSortedDate.total);
});

it(`should return status 400 when query is wrong`, async () => {
  const res = await Promise.all([
    supertest(server).get(`/api/articles?limit=wrong`),
    supertest(server).get(`/api/articles?sorting=wrong`),
    supertest(server).get(`/api/articles?offset=wrong`),
    supertest(server).get(`/api/articles?ofset=1`),
    supertest(server).get(`/api/articles?limit=3&offset=1&sorting=date&etc=1`),
  ]);

  const statuses = res.map((it) => it.status);

  expect(statuses).toEqual([400, 400, 400, 400, 400]);
});

it(`should return full post with id=1`, async () => {
  const res = await supertest(server).get(`/api/articles/1`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(post1);
});

it(`should delete post with id=1`, async () => {
  const res = await supertest(server).delete(`/api/articles/1`);
  const resAfter = await supertest(server).get(`/api/articles/1`);
  expect(res.status).toBe(200);
  expect(resAfter.status).toBe(400);
});

it(`should update post with id=2`, async () => {
  const res = await supertest(server).put(`/api/articles/2`).send({
    title: `Long Live Rock'n'Roll Long Live Rock'n'Roll`,
    date: `2020-08-06T14:50:45.470Z`,
    announce: `Из под его пера вышло 8 платиновых альбомов.\nПо совести говоря, бояться нечего.\nТут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!\nТак что и вы не очень огорчайтесь, если тоже не сразу все поймете.\nНо если вы ему скажете, что `,
    categories: [`1`]
  });

  const resAfter = await supertest(server).get(`/api/articles/2`);

  expect(res.status).toBe(200);
  expect(resAfter.status).toBe(200);
  expect(resAfter.body.title).toBe(`Long Live Rock'n'Roll Long Live Rock'n'Roll`);
});

it(`should create a new post`, async () => {
  const newPost = {
    title: `Test Title Test Title Test Title`,
    date: `2020-08-04T06:15:45.470Z`,
    announce: `Test Announce Test Announce Test Announce Test Announce Test Announce Test Announce Test Announce Test Announce`,
    categories: [`1`, `2`],
    text: `Test Text`,
    picture: {
      name: Date.now().toString(),
      originalName: `picture.jpg`
    }
  };

  const res = await supertest(server).post(`/api/articles`).send(newPost);
  expect(res.status).toBe(201);

  const id = res.body.id;
  const resAfter = await supertest(server).get(`/api/articles/${id}`);

  expect(resAfter.status).toBe(200);
  expect(resAfter.body.title).toBe(newPost.title);
});

it(`should return all comments from post`, async () => {
  const res = await supertest(server).get(`/api/articles/10/comments`);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(post10Comments);
});

it(`should delete comment from post`, async () => {
  const res = await supertest(server).delete(`/api/articles/10/comments/21`);
  const resAfter = await supertest(server).get(`/api/articles/10/comments`);
  expect(res.status).toBe(200);
  expect(resAfter.body.find((it) => it.id === `21`)).toBeUndefined();
});

it(`should add comment to post`, async () => {
  const res = await supertest(server).post(`/api/articles/10/comments/`).send({
    text: `Test text Test text Test text Test text`,
    date: `2020-08-04T06:15:45.470Z`,
    userId: `1`
  });
  const resAfter = await supertest(server).get(`/api/articles/10/comments`);
  const id = res.body.id;

  expect(res.status).toBe(201);
  expect(resAfter.status).toBe(200);
  expect(resAfter.body.find((it) => it.id === id)).toBeDefined();
});

it(`should return status 400 when post is not valid`, async () => {
  const posts = [{
    title: `short`,
    text: 123,
    announce: ``,
    date: new Date(),
    picture: `name.jpg`,
    categories: [`category1`],
  }, {
    title: `Title Title Title Title Title`,
    // text: 123,
    announce: `Announce announce announce announce`,
    date: `2020-08-04T06:15:45.470Z`,
    picture: `name.jpg`,
    categories: [`category1`],
  }, {
    title: `Title Title Title Title Title`,
    text: `123`,
    announce: `Announce announce announce announce`,
    date: `2020-08-04T06:15:45.470Z`,
    picture: `name.jpg`,
    categories: [`1`],
  }];

  const res = await Promise.all([
    supertest(server).post(`/api/articles`).send(posts[0]),
    supertest(server).post(`/api/articles`).send(posts[1]),
    supertest(server).post(`/api/articles`).send(posts[2]),
    supertest(server).put(`/api/articles/10`).send(posts[0]),
    supertest(server).put(`/api/articles/10`).send(posts[1]),
    supertest(server).put(`/api/articles/10`).send(posts[2]),
  ]);

  const statuses = res.map((it) => it.status);

  expect(statuses).toEqual([400, 400, 400, 400, 400, 400]);
});

it(`should return status 400 when comment is not valid`, async () => {
  const comments = [{
    date: Date.now(),
    text: `1 2 3 4 5 6 7 8 9 0 `,
    userId: `1`,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    text: `1 2 3 4 5 6 7 8 9 0 `,
    userId: `abc`,
  }, {
    text: `1 2 3 4 5 6 7 8 9 0 `,
    userId: `1`,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    userId: `1`,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    text: `1 2 3 4 5 6 7 8 9 0 `,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    text: `1 2 3 4 5 6 7 8 9 0 `,
    userId: `1`,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    text: `1 2 3 4 5 6 7 8 9 0 `,
    userId: `1111`,
  }, {
    date: `2020-08-04T06:15:45.470Z`,
    text: `1 2 3 4 5`,
    userId: `1`,
  }];

  const res = await Promise.all([
    supertest(server).post(`/api/articles/10/comments`).send(comments[0]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[1]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[2]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[3]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[4]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[5]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[6]),
    supertest(server).post(`/api/articles/10/comments`).send(comments[7]),
  ]);

  const statuses = res.map((it) => it.status);

  expect(statuses).toEqual([400, 400, 400, 400, 400, 201, 400, 400]);
});

