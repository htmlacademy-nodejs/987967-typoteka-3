'use strict';

const {Sequelize} = require(`sequelize`);
const {Post, PostCategory, User, Comment, Picture} = require(`../models`);

const createPost = async (post) => {
  const postData = {
    ...post,
    postCategories: post.categories.map((it) => ({[`category_id`]: it}))
  };

  return Post.sequelize.transaction(async (t) => {
    return Post.create(postData, {
      include: [Post.Picture, Post.PostCategory],
      transaction: t
    });
  });
};

const getPost = async (id) => {
  const query = {
    attributes: [
      `id`,
      `title`,
      `date`,
      `announce`,
      `text`,
    ],
    include: [{
      association: Post.Category,
      attributes: [`id`, `name`],
      through: {
        attributes: []
      },
    }, {
      association: Post.Comment,
      include: {
        association: Comment.User,
        include: {
          association: User.Avatar,
          attributes: [`name`]
        }
      },
    }, {
      association: Post.Picture,
      attributes: [`name`, `originalName`]
    }],
    where: {id},
    order: [[Post.Comment, `date`, `ASC`]]
  };

  return await Post.findOne(query);
};

const deletePost = async (id) => {
  return Post.destroy({
    where: {id}
  });
};

const updatePost = async (id, post) => {
  const transaction = await Post.sequelize.transaction();

  try {
    await Post.update(post, {
      where: {id},
      transaction
    });

    await updatePicture(id, post.picture, transaction);

    await PostCategory.destroy({
      where: {[`post_id`]: id},
      transaction
    });

    await PostCategory.bulkCreate(post.categories.map((it) => ({
      [`category_id`]: it,
      [`post_id`]: id,
    })), {transaction});

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const updatePicture = async (postId, pictureData, transaction) => {
  const createPicture = async () => Picture.create({
    [`post_id`]: postId,
    name: pictureData.name,
    originalName: pictureData.originalName,
  }, {transaction});

  const destroyPicture = async () => Picture.destroy({where: {[`post_id`]: postId}}, {transaction});

  const oldPicture = !!(await Picture.findOne({where: {[`post_id`]: postId}}));
  const newPicture = !!pictureData;

  switch (true) {
    case oldPicture && newPicture:
      if (oldPicture.name === pictureData.name) {
        return Promise.resolve();
      }

      await destroyPicture();
      return createPicture();

    case !oldPicture && newPicture:
      return createPicture();

    case oldPicture && !newPicture:
      return destroyPicture();

    case !oldPicture && !newPicture:
    default:
      return Promise.resolve();
  }
};

const search = async (query) => {
  return Post.findAll({
    where: {
      title: {
        [Sequelize.Op.regexp]: query
      }
    }
  });
};

module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
  search,
};
