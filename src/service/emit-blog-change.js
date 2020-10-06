'use strict';

const {createServer} = require(`http`);
const io = require(`socket.io`);
const {SERVICE_SOCKET_PORT} = require(`./config`);
const {AppEvent} = require(`./const`);
const logger = require(`../logger`).getLogger(`app`);

const server = createServer();
const socketServer = io(server);

server.on(`error`, (err) => {
  logger.debug(`Error creating web socket server: ${err}`);
});

server.listen(SERVICE_SOCKET_PORT);

let storedPopularPostList;

const emitBlogChange = ({post, recentCommentList, popularPostList}) => {
  socketServer.emit(AppEvent.CHANGE_POST_COMMENTS, post, recentCommentList);

  const popularPostListData = JSON.stringify(popularPostList);
  if (popularPostListData !== storedPopularPostList) {
    storedPopularPostList = popularPostListData;
    socketServer.emit(AppEvent.CHANGE_POPULAR_POSTS, popularPostList);
  }
};

module.exports = {
  emitBlogChange,
};
