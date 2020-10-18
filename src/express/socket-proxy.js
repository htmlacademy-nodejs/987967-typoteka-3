'use strict';

const io = require(`socket.io`);
const ioClient = require(`socket.io-client`);
const {PugTemplateName, PugRender} = require(`./pug-render`);
const {AppEvent, ServerEvent} = require(`./const`);
const {customEventName} = require(`./utils`);
const {ServiceToExpressAdapter} = require(`./data-adapter`);
const logger = require(`../logger`).getLogger(`socket-proxy`);

const createSocketProxy = (inputPort, inputHost, server) => {
  const socketClient = ioClient(`http://${inputHost}:${inputPort}`);
  const socketServer = io(server);

  socketClient.addEventListener(ServerEvent.CHANGE_POST_COMMENTS, (post, recentCommentList) => {
    const adaptedPost = ServiceToExpressAdapter.getPost(post);

    try {
      const recentCommentHtml = PugRender[PugTemplateName.RECENT_COMMENTS](recentCommentList);
      const postCommentHtml = PugRender[PugTemplateName.POST_COMMENTS](adaptedPost);

      socketServer.emit(AppEvent.CHANGE_RECENT_COMMENTS, recentCommentHtml);
      socketServer.emit(customEventName(AppEvent.CHANGE_POST_COMMENTS, post.id), postCommentHtml);
    } catch (err) {
      logger.error(err);
    }
  });

  socketClient.addEventListener(ServerEvent.CHANGE_POPULAR_POSTS, (popularPostList) => {
    try {
      const html = PugRender[PugTemplateName.POPULAR_POSTS](popularPostList);
      socketServer.emit(AppEvent.CHANGE_POPULAR_POSTS, html);
    } catch (err) {
      logger.error(err);
    }
  });
};

module.exports = {
  createSocketProxy,
};
