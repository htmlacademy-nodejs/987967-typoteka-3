'use strict';

const {Router} = require(`express`);
const {getMockPosts} = require(`../../../utils`);

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {
    const posts = await getMockPosts();
    res.json(posts);
  } catch (err) {
    res.send([]);
  }
});

module.exports = {
  postsRouter
};
