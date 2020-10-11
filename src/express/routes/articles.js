'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const multer = require(`multer`);
const {dataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE, POST_PREVIEW_COUNT} = require(`../const`);
const {getPagination, extractPicture, render} = require(`../utils`);
const {findPostByParam, getCategories, getAllCategories, getCategory, privateRoute, privateReaderRoute, validateBodySchema, validateQuerySchema} = require(`../middlewares`);
const {postSchema, commentSchema} = require(`../joi-schemas`);

const FormType = {
  CREATE: `create`,
  EDIT: `edit`
};

const articleRouter = new Router();
 
const upload = multer({dest: `src/express/public/img/post-images`});

const filterCategories = (postCategories, categories) => categories.filter((category) => postCategories.find((it) => it.id === category.id));

const validatePostData = (formType) => async (req, res, next) => {
  const {categories, post} = res.locals;

  const formPreferences = formType === FormType.EDIT ? {
    title: EDIT_POST_TITLE,
    action: `/articles/edit/${post.id}`
  } : {
    title: NEW_POST_TITLE,
    action: `/articles/add`
  };

  const additionData = {
    categories,
    ...formPreferences,
  };
  await validateBodySchema(postSchema, `new-post`, additionData)(req, res, next);
};

const validateCommentData = async (req, res, next) => {
  const {post, categories} = res.locals;
  const {comments} = post;
  post.categories = filterCategories(post.categories, categories);
  await validateBodySchema(commentSchema, `post`, {post, comments})(req, res, next);
};

const validatePagination = async (req, res, next) => {
  const {category} = res.locals;
  const categoryPostCount = category.count;
  const pageCount = Math.ceil(categoryPostCount / POST_PREVIEW_COUNT);

  const querySchema = Joi.object({
    page: Joi.number().min(1).max(pageCount).optional(),
  });

  await validateQuerySchema(querySchema, `400`)(req, res, next);
};

articleRouter.get(`/add`, [privateRoute, getAllCategories], async (req, res, next) => {
  try {
    const {categories} = res.locals;
    const date = new Date().toISOString();
    const formData = {
      date,
    };

    render(`new-post`, {
      title: NEW_POST_TITLE,
      formData,
      categories,
      action: `/articles/add`
    }, req, res);
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/:postId`, [getCategories, findPostByParam], async (req, res, next) => {
  try {
    const {categories, post} = res.locals;
    const {comments} = post;

    post.categories = filterCategories(post.categories, categories);
    render(`post`, {post, comments}, req, res);
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/category/:categoryId`, [getCategories, getCategory, validatePagination], async (req, res, next) => {
  const {categories, category} = res.locals;
  const page = req.query.page || 1;

  const categoryPostCount = category.count;
  const pageCount = Math.ceil(categoryPostCount / POST_PREVIEW_COUNT);

  try {
    const {posts} = await dataServer.getCategoryPostPreviews(category.id, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT);

    render(`articles-by-category`, {
      categories,
      categoryName: category.name,
      posts,
      pagination: getPagination(page, pageCount, req.originalUrl.replace(/\?.+/, ``)),
    }, req, res);
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/edit/:postId`, [privateRoute, getAllCategories, findPostByParam], async (req, res, next) => {
  try {
    const {postId} = req.params;
    const {categories, post} = res.locals;

    const {title, date, text, announce, picture, categories: postCategories} = post;
    const {name, originalName} = picture || {name: ``, originalName: ``};
    const checkedCategories = postCategories.reduce((acc, cur) => ({...acc, [`category-id-${cur.id}`]: cur.name}), {});

    const formData = {
      title,
      date,
      text,
      announce,
      ...checkedCategories,
      fileName: name,
      originalName,
    };

    render(`new-post`, {
      title: EDIT_POST_TITLE,
      formData,
      categories,
      action: `/articles/edit/${postId}`
    }, req, res);
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/edit/:postId`, [privateRoute, findPostByParam, upload.single(`picture`), getAllCategories, validatePostData(FormType.EDIT)], async (req, res, next) => {
  const {postId} = req.params;
  const picture = extractPicture(req);
  const {title, date, announce, text} = req.body;
  const categories = Object.keys(req.body).filter((it) => /^category-id-\d+$/.test(it)).map((it) => it. replace(/^category-id-(\d+)$/, `$1`));
  const postData = {
    title,
    date,
    announce,
    text,
    categories,
    picture,
  };

  try {
    await dataServer.updatePost(postId, postData);
    res.redirect(`/my`);
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/add`, [privateRoute, upload.single(`picture`), getAllCategories, validatePostData(FormType.CREATE)], async (req, res, next) => {
  const picture = extractPicture(req);
  const {title, date, announce, text} = req.body;
  const categories = Object.keys(req.body).filter((it) => /^category-id-\d+$/.test(it)).map((it) => it. replace(/^category-id-(\d+)$/, `$1`));
  const postData = {
    title,
    date,
    announce,
    text,
    categories,
    picture,
  };

  try {
    await dataServer.createPost(postData);
    res.redirect(`/my`);
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/:postId`, [privateReaderRoute, getCategories, findPostByParam, validateCommentData], async (req, res, next) => {
  const {postId} = req.params;
  const {text} = req.body;
  const {user} = req.session;

  const commentData = {
    date: new Date().toISOString(),
    text,
    postId,
    userId: user.id
  };

  try {
    await dataServer.createComment(commentData);
    res.redirect(`/articles/${postId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  articleRouter,
};
