'use strict';

const {EventEmitter} = require(`events`);
const {DBEvent, RECENT_COMMENT_COUNT, POPULAR_POST_COUNT, PostSortType} = require(`../const`);
const {DBInternalEvent} = require(`./const`);
const {commentEventEmitter, getComments} = require(`./comment-service`);
const {getPosts} = require(`./posts-service`);
const {getPost} = require(`./post-service`);

const dbEventEmitter = new EventEmitter();

const changeCommentHandler = async (postId) => {
  const [post, recentCommentList, popularPostList] = await Promise.all([
    getPost(postId),
    getComments(RECENT_COMMENT_COUNT),
    getPosts(PostSortType.BY_POPULARITY, POPULAR_POST_COUNT)
  ]);

  dbEventEmitter.emit(DBEvent.CHANGE_POST_COMMENTS, post, recentCommentList);

  const popularPostListData = JSON.stringify(popularPostList);
  if (popularPostListData !== storedPopularPostList) {
    storedPopularPostList = popularPostListData;
    dbEventEmitter.emit(DBEvent.CHANGE_POPULAR_POSTS, popularPostList);
  }
};

let storedPopularPostList;
commentEventEmitter.on(DBInternalEvent.ADD_COMMENT, changeCommentHandler);
commentEventEmitter.on(DBInternalEvent.REMOVE_COMMENT, changeCommentHandler);

module.exports = {
  dbEventEmitter,
};
