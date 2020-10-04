'use strict';

const io = require(`socket.io`);
const {SERVICE_SOCKET_PORT} = require(`./config`);
const {AppEvent} = require(`./const`);

const socketServer = io(SERVICE_SOCKET_PORT);

let storedPopularPostList;

const emitBlogChange = ({post, lastestCommentList, popularPostList}) => {
  socketServer.emit(AppEvent.CHANGE_POST_COMMENT, post, lastestCommentList);

  const popularPostListData = JSON.stringify(popularPostList);
  if (popularPostListData !== storedPopularPostList) {
    storedPopularPostList = popularPostListData;
    socketServer.emit(AppEvent.CHANGE_POPULAR_POSTS, popularPostList);
  }
};

module.exports = {
  emitBlogChange,
};
