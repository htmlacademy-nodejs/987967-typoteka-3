'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE, POST_PREVIEW_COUNT} = require(`../const`);
const {getPagination, parseJoiException} = require(`../utils`);
const {findPostByParam, getCategories, getAllCategories, getCategory, privateRoute} = require(`../middlewares`);
const {createPostSchema, commentSchema} = require(`../joi-schemas`);

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

articleRouter.get(`/add`, [privateRoute, getAllCategories], async (req, res, next) => {
  try {
    const {categories} = res.locals;
    const {user} = req.session;
    const date = new Date().toISOString();
    const post = {
      date,
    };

    res.render(`new-post`, {
      user,
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
    const {user} = req.session;

    post.categories = filterCategories(post.categories, categories);
    res.render(`post`, {user, post});
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/category/:categoryId`, [getCategories, getCategory], async (req, res, next) => {
  const {categories, category} = res.locals;
  const {user} = req.session;

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
      user,
      categories,
      categoryName: category.name,
      posts,
      pagination: getPagination(page, pageCount, req.originalUrl.replace(/\?.+/, ``)),
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/edit/:postId`, [privateRoute, getAllCategories, findPostByParam], async (req, res, next) => {
  try {
    const {postId} = req.params;
    const {categories, post} = res.locals;
    const {user} = req.session;

    res.render(`new-post`, {
      user,
      title: EDIT_POST_TITLE,
      post,
      categories: checkCategories(categories, post.categories.map((it) => it.id)),
      action: `/articles/edit/${postId}`
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/edit/:postId`, [privateRoute, findPostByParam, upload.single(`picture`), getAllCategories, validateFormData], async (req, res, next) => {
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

articleRouter.post(`/add`, [privateRoute, upload.single(`picture`), getAllCategories, validateFormData], async (req, res, next) => {
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

articleRouter.post(`/:postId/comment`, [getCategories, findPostByParam], async (req, res, next) => {
  const {postId} = req.params;
  const {user} = req.session;
  const {text} = req.body;
  const {categories, post} = res.locals;

  if (!user) {
    res.redirect(`/login`);
    return;
  }

  const commentData = {
    date: new Date().toISOString(),
    text,
    postId,
    userId: user.id
  };

  try {
    await commentSchema.validateAsync(commentData.text);
    await dataServer.createComment(commentData);
    res.redirect(`/articles/${postId}`);
  } catch (err) {
    if (err.isJoi) {
      const errors = parseJoiException(err);
      post.categories = filterCategories(post.categories, categories);
      res.render(`post`, {user, post, comment: text, errors});
      return;
    }

    next(err);
  }
});

module.exports = {
  articleRouter,
};
