'use strict';

const io = require(`socket.io`);
const {AppEvent, DBEvent} = require(`./const`);
const {dbEventEmitter} = require(`./db-service`);

const createSocketServer = (server) => {
  const socketServer = io(server);

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
