'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);
const {sortCommentsByDate, sortPostsByDate} = require(`../../utils`);

const myRouter = new Router();
const dataServer = new DataServer();

myRouter.get(`/`, async (req, res) => {
  const posts = await dataServer.getUserPosts();
  res.render(`my`, {
    posts: sortPostsByDate(posts)
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const comments = await dataServer.getUserComments();
  res.render(`comments`, {
    comments: sortCommentsByDate(comments)
  });
});

module.exports = {
  myRouter,
};
