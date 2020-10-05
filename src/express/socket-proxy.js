'use strict';

const io = require(`socket.io`);
const ioClient = require(`socket.io-client`);
const {PugTemplateName, PugRender} = require(`./pug-render`);
const {AppEvents} = require(`./const`);
const {customEventName} = require(`./utils`);

const createSocketProxy = (inputPort, outputPort) => {
  const socketClient = ioClient(`http://localhost:${inputPort}`);
  const socketServer = io(outputPort);

  socketClient.addEventListener(`change_post_comment`, (post, recentCommentList) => {
    const recentCommentHtml = PugRender[PugTemplateName.RECENT_COMMENTS](recentCommentList);
    socketServer.emit(AppEvents.CHANGE_RECENT_COMMENTS, recentCommentHtml);

    const {id} = post;
    const postCommentHtml = PugRender[PugTemplateName.POST_COMMENTS](post);
    socketServer.emit(customEventName(AppEvents.CHANGE_POST_COMMENTS, id), postCommentHtml);

    // console.log(`postCommentHtml: ${postCommentHtml}`);
  });

  socketClient.addEventListener(`change_popular_posts`, (popularPostList) => {
    const html = PugRender[PugTemplateName.POPULAR_POSTS](popularPostList);
    socketServer.emit(AppEvents.CHANGE_POPULAR_POSTS, html);
  });
};

module.exports = {
  createSocketProxy,
};
