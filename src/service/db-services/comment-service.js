'use strict';

const {Comment, User} = require(`../models`);
const {getLimitConstrain} = require(`../utils`);

const createComment = async ({text, date, userId, postId}) => {
  return Comment.create({
    text,
    date,
    [`user_id`]: userId,
    [`post_id`]: postId,
  });
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

const deleteComment = async (id) => {
  return Comment.destroy({
    where: {id}
  });
};

module.exports = {
  createComment,
  getComment,
  getComments,
  deleteComment,
};
