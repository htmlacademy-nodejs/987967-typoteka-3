'use strict';

const {EventEmitter} = require(`events`);
const {Comment, User} = require(`../models`);
const {getLimitConstrain} = require(`../utils`);
const {DBInternalEvent} = require(`./const`);

const commentEventEmitter = new EventEmitter();

const createComment = async ({text, date, userId, postId}) => {
  const comment = await Comment.create({
    text,
    date,
    [`user_id`]: userId,
    [`post_id`]: postId,
  });

  commentEventEmitter.emit(DBInternalEvent.ADD_COMMENT, postId);

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

  commentEventEmitter.emit(DBInternalEvent.REMOVE_COMMENT, postId);

  return result;
};

module.exports = {
  createComment,
  getComment,
  getComments,
  deleteComment,
  commentEventEmitter,
};
