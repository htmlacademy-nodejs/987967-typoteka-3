'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE, POST_PREVIEW_COUNT} = require(`../const`);
const {getPagination, parseJoiException} = require(`../utils`);
const {findPostByParam, getCategories, getAllCategories, getCategory} = require(`../middlewares`);
const {createPostSchema} = require(`../joi-schemas`);

const articleRouter = new Router();
const dataServer = new DataServer();
const upload = multer({dest: `src/express/public/img/post-images`});

const checkCategories = (allCategories, checkedIds) => allCategories.map((category) => ({
  ...category,
  checked: !!checkedIds.find((it) => it === category.id)
}));

const filterCategories = (postCategories, categories) => categories.filter((category) => postCategories.find((it) => it.id === category.id));

const validateFormData = async (req, res, next) => {
  const {categories} = res.locals;

  const {
    date,
    title,
    announce,
    text,
    [`picture-preview`]: originalName,
    [`picture-db-name`]: name
  } = req.body;

  const postCategories = Object.keys(req.body).filter((it) => /^category-id-\d+$/.test(it)).map((it) => it.replace(/^category-id-/, ``));
  const postData = {
    date,
    title,
    announce,
    text,
    categories: postCategories,
    picture: originalName ? {
      name: req.file ? req.file.filename : name,
      originalName,
    } : undefined
  };

  try {
    res.locals.postData = postData;
    const postSchema = createPostSchema(categories);
    await postSchema.validateAsync(postData, {abortEarly: false});

    next();
  } catch (err) {

    if (err.isJoi) {
      res.locals.errors = parseJoiException(err);
      next();
      return;
    }

    next(err);
  }
};

articleRouter.get(`/add`, getAllCategories, async (req, res, next) => {
  try {
    const {categories} = res.locals;
    const date = new Date().toISOString();
    const post = {
      date,
    };

    res.render(`new-post`, {
      title: NEW_POST_TITLE,
      post,
      categories,
      action: `/articles/add`
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/:postId`, [getCategories, findPostByParam], async (req, res, next) => {
  try {
    const {categories, post} = res.locals;

    post.categories = filterCategories(post.categories, categories);
    res.render(`post`, {post});
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/category/:categoryId`, [getCategories, getCategory], async (req, res, next) => {
  const {categories, category} = res.locals;
  const categoryPostCount = category.count;
  const pageCount = Math.ceil(categoryPostCount / POST_PREVIEW_COUNT);
  const querySchema = Joi.object({
    page: Joi.number().min(1).max(pageCount),
  });

  try {
    const query = await querySchema.validateAsync(req.query);
    const page = query.page || 1;

    const {posts} = await dataServer.getCategoryPostPreviews(category.id, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT);

    res.render(`articles-by-category`, {
      categories,
      categoryName: category.name,
      posts,
      pagination: getPagination(page, pageCount, req.originalUrl.replace(/\?.+/, ``)),
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/edit/:postId`, [getAllCategories, findPostByParam], async (req, res, next) => {
  try {
    const {postId} = req.params;
    const {categories, post} = res.locals;

    res.render(`new-post`, {
      title: EDIT_POST_TITLE,
      post,
      categories: checkCategories(categories, post.categories.map((it) => it.id)),
      action: `/articles/edit/${postId}`
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/edit/:postId`, [findPostByParam, upload.single(`picture`), getAllCategories, validateFormData], async (req, res, next) => {
  const {postData, post, errors, categories} = res.locals;

  try {
    if (errors) {
      const renderData = {
        title: EDIT_POST_TITLE,
        post: postData,
        categories: checkCategories(categories, postData.categories),
        action: `/articles/edit/${post.id}`,
        errors,
      };

      res.render(`new-post`, renderData);
    } else {
      await dataServer.updatePost(post.id, postData);
      res.redirect(`/my`);
    }
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/add`, [upload.single(`picture`), getAllCategories, validateFormData], async (req, res, next) => {
  const {postData, categories, errors} = res.locals;

  try {
    if (errors) {
      const renderData = {
        title: NEW_POST_TITLE,
        post: postData,
        categories: checkCategories(categories, postData.categories),
        action: `/articles/add`,
        errors,
      };

      res.render(`new-post`, renderData);
    } else {
      await dataServer.createPost(postData);
      res.redirect(`/my`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  articleRouter,
};
