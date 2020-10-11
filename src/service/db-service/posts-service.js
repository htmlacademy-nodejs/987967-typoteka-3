'use strict';

const {Sequelize} = require(`sequelize`);
const {Post, PostCategory} = require(`../models`);
const {PostSortType} = require(`../const`);
const {getLimitConstrain} = require(`../utils`);

const prepareCategoryData = ({name}, categories) => {
  const category = categories.find((it) => it.name === name);

  if (!category) {
    throw new Error(`Wrong mock data. Category "${name}" not found`);
  }

  return {[`category_id`]: category.id};
};

const prepareCommentData = ({text, date, user}, users) => {
  const commentUser = users.find((it) => it.email === user.email);

  if (!commentUser) {
    throw new Error(`Wrong mock data. User "${user.email}" not found`);
  }

  return {text, date, [`user_id`]: commentUser.id};
};

const preparePostData = ({title, date, announce, text, picture: pictureData, originalPicture, comments: commentData, categories}, dbUsers, dbCategories) => {
  const comments = commentData.map((it) => prepareCommentData(it, dbUsers));
  const postCategories = categories.map((it) => prepareCategoryData(it, dbCategories));
  const picture = pictureData ? {
    name: pictureData,
    originalName: originalPicture,
  } : null;

  const post = {
    title,
    date,
    announce,
    text
  };

  return {...post, comments, postCategories, picture};
};

const createPosts = async (postData, users, categories) => {
  const posts = postData.map((it) => preparePostData(it, users, categories));
  return Post.bulkCreate(posts, {
    include: [
      Post.Picture,
      Post.Comment,
      Post.PostCategory,
    ]
  });
};

const queryPostsByIds = (ids) =>({
  attributes: [
    `id`,
    `title`,
    `date`,
    `announce`,
    [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `comment_count`]
  ],
  include: [{
    association: Post.Category,
    attributes: [`id`, `name`],
    through: {
      attributes: []
    },
  }, {
    association: Post.Comment,
    attributes: []
  }, {
    association: Post.Picture,
    attributes: [`name`]
  }],
  group: [`Post.id`, `categories.id`, `picture.id`],
  where: {id: {[Sequelize.Op.in]: ids}}
});

const getPostsSortedByPopularity = async (limit, offset) => {
  const {count, rows} = await Post.findAndCountAll({
    attributes: [`Post.id`],
    include: [{
      association: Post.Comment,
      attributes: []
    }],
    group: `Post.id`,
    order: [[Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]],
    ...getLimitConstrain(limit, offset),
    subQuery: false,
    raw: true
  });

  const postIds = rows.map((it) => Number(it.id));

  const query = queryPostsByIds(postIds);
  query.order = [[Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `DESC`], [`id`, `ASC`]];

  return {
    posts: await Post.findAll(query),
    total: count.length,
  };
};

const getPostsSortedByDate = async (limit, offset) => {
  const {rows, count} = await Post.findAndCountAll({
    attributes: [`id`, `date`],
    order: [[`date`, `DESC`], [`id`, `ASC`]],
    ...getLimitConstrain(limit, offset),
    raw: true
  });

  const postIds = rows.map((it) => Number(it.id));

  const query = queryPostsByIds(postIds);
  query.order = [[`date`, `DESC`], [`id`, `ASC`]];

  return {
    posts: await Post.findAll(query),
    total: count,
  };
};

const getCategoryPosts = async (categoryId, limit, offset) => {
  const {rows, count} = await PostCategory.findAndCountAll({
    attributes: [[`post_id`, `id`]],
    include: [{
      association: PostCategory.Post,
      attributes: [`date`, `title`]
    }],
    where: {[`category_id`]: categoryId},
    raw: true,
    order: [[Sequelize.col(`post.date`), `DESC`], [Sequelize.col(`post.title`), `ASC`]],
    ...getLimitConstrain(limit, offset),
  });

  const postIds = rows.map((it) => Number(it.id));
  const query = queryPostsByIds(postIds);

  return {
    posts: await Post.findAll({
      ...query,
      order: [[`date`, `DESC`], [`title`, `ASC`]]
    }),
    total: count,
  };
};

const getPosts = async (sortType, limit, offset) => {
  switch (sortType) {
    case PostSortType.BY_DATE:
      return getPostsSortedByDate(limit, offset);

    case PostSortType.BY_POPULARITY:
    default:
      return getPostsSortedByPopularity(limit, offset);
  }
};

module.exports = {
  createPosts,
  getCategoryPosts,
  getPosts,
};
