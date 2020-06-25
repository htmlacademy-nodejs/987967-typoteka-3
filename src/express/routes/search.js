'use strict';

const {Router} = require(`express`);
const {DataServer} = require(`../data-server`);

const searchRouter = new Router();
const dataServer = new DataServer();

searchRouter.get(`/`, async (req, res) => {
  const query = req.query.query;
  const foundPosts = query ? await dataServer.search(query) : [];
  const markedPosts = foundPosts.map((it) => ({
    ...it,
    title: it.title.replace(RegExp(`(${query})`, `ig`), `<b>$1</b>`)
  }));

  res.render(`search`, {
    query,
    foundPosts: markedPosts,
  });
});

module.exports = {
  searchRouter,
};
