'use strict';

const io = require(`socket.io`);
const ioClient = require(`socket.io-client`);
const {PugTemplateName, PugRender} = require(`./pug-render`);
const {AppEvent, ServerEvent} = require(`./const`);
const {customEventName} = require(`./utils`);
const {ServiceToExpressAdapter} = require(`./data-adapter`);

const createSocketProxy = (inputPort, server) => {
  const socketClient = ioClient(`http://localhost:${inputPort}`);
  const socketServer = io(server);

  socketClient.addEventListener(ServerEvent.CHANGE_POST_COMMENTS, (post, recentCommentList) => {
    const recentCommentHtml = PugRender[PugTemplateName.RECENT_COMMENTS](recentCommentList);
    socketServer.emit(AppEvent.CHANGE_RECENT_COMMENTS, recentCommentHtml);

    const adaptedPost = ServiceToExpressAdapter.getPost(post);
    const postCommentHtml = PugRender[PugTemplateName.POST_COMMENTS](adaptedPost);
    socketServer.emit(customEventName(AppEvent.CHANGE_POST_COMMENTS, post.id), postCommentHtml);
  });

  socketClient.addEventListener(ServerEvent.CHANGE_POPULAR_POSTS, (popularPostList) => {
    const html = PugRender[PugTemplateName.POPULAR_POSTS](popularPostList);
    socketServer.emit(AppEvent.CHANGE_POPULAR_POSTS, html);
  });
};

module.exports = {
  createSocketProxy,
};
