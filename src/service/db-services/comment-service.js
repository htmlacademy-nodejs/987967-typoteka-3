'use strict';

const {Comment, User} = require(`../models`);
const {getLimitConstrain} = require(`../utils`);
const {RECENT_COMMENT_COUNT, POPULAR_POST_COUNT, PostSortType} = require(`../const`);
const {getPosts} = require(`./posts-service`);
const {getPost} = require(`./post-service`);
const {emitBlogChange} = require(`../emit-blog-change`);

const getChangedBlogData = async (postId) => {
  const [post, recentCommentList, popularPostList] = await Promise.all([
    getPost(postId),
    getComments(RECENT_COMMENT_COUNT),
    getPosts(PostSortType.BY_POPULARITY, POPULAR_POST_COUNT)
  ]);

  return {
    post,
    recentCommentList,
    popularPostList,
  };
};

const createComment = async ({text, date, userId, postId}) => {
  const comment = await Comment.create({
    text,
    date,
    [`user_id`]: userId,
    [`post_id`]: postId,
  });

  emitBlogChange(await getChangedBlogData(postId));

  return comment;
};

const getComment = async (id) => {
  return Comment.findByPk(id);
};

const getComments = async (limit, offset) => {
  const query = {
    attributes: [`id`, `date`, `text`],
    include: [{
      association: Comment.User,
      include: [{
        association: User.Avatar,
        attributes: [`name`]
      }]
    }, {
      association: Comment.Post,
      attributes: [`id`, `title`]
    }],
    order: [[`date`, `DESC`]],
    ...getLimitConstrain(limit, offset)
  };

  return Comment.findAll(query);
};

const deleteComment = async (commentId, postId) => {
  const result = await Comment.destroy({
    where: {id: commentId}
  });

  emitBlogChange(await getChangedBlogData(postId));

  return result;
};

module.exports = {
  createComment,
  getComment,
  getComments,
  deleteComment,
};
