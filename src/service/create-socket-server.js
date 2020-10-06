'use strict';

const {createServer} = require(`http`);
const io = require(`socket.io`);
const {AppEvent, DBEvent} = require(`./const`);
const {dbEventEmitter} = require(`./db-service`);
const logger = require(`../logger`).getLogger(`app`);

const createSocketServer = (port) => {
  const server = createServer();
  const socketServer = io(server);

  server.on(`error`, (err) => {
    logger.info(`Web socket server not created: ${err}`);
  });

  server.listen(port);

  dbEventEmitter.addListener(DBEvent.CHANGE_POST_COMMENTS, (post, recentCommentList) => {
    socketServer.emit(AppEvent.CHANGE_POST_COMMENTS, post, recentCommentList);
  });

  dbEventEmitter.addListener(DBEvent.CHANGE_POPULAR_POSTS, (popularPostList) => {
    socketServer.emit(AppEvent.CHANGE_POPULAR_POSTS, popularPostList);
  });

  return socketServer;
};

module.exports = {
  createSocketServer,
};
