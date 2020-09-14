'use strict';

const {Router} = require(`express`);
const Joi = require(`joi`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE, POST_PREVIEW_COUNT} = require(`../const`);
const {getPagination, parseJoiException, extractPicture} = require(`../utils`);
const {findPostByParam, getCategories, getAllCategories, getCategory, privateRoute, validateBodySchema} = require(`../middlewares`);
const {postSchema, commentSchema} = require(`../joi-schemas`);

const FormType = {
  CREATE: `create`,
  EDIT: `edit`
};

const articleRouter = new Router();
const dataServer = new DataServer();
const upload = multer({dest: `src/express/public/img/post-images`});

const filterCategories = (postCategories, categories) => categories.filter((category) => postCategories.find((it) => it.id === category.id));

const validateFormData = (formType) => async (req, res, next) => {
  const {categories, post} = res.locals;
  const formPreferences = formType === FormType.EDIT ? {
    title: EDIT_POST_TITLE,
    action: `/articles/edit/${post.id}`
  } : {
    title: NEW_POST_TITLE,
    action: `/articles/add`
  };

  const addtionalData = {
    categories,
    ...formPreferences,
  };
  await validateBodySchema(postSchema, `new-post`, addtionalData)(req, res, next);
};

articleRouter.get(`/add`, [privateRoute, getAllCategories], async (req, res, next) => {
  try {
    const {categories} = res.locals;
    const {user} = req.session;
    const date = new Date().toISOString();
    const formData = {
      date,
    };

    res.render(`new-post`, {
      user,
      title: NEW_POST_TITLE,
      formData,
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

    res.render(`new-post`, {
      user,
      title: EDIT_POST_TITLE,
      formData,
      categories,
      action: `/articles/edit/${postId}`
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/edit/:postId`, [privateRoute, findPostByParam, upload.single(`picture`), getAllCategories, validateFormData(FormType.EDIT)], async (req, res, next) => {
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

articleRouter.post(`/add`, [privateRoute, upload.single(`picture`), getAllCategories, validateFormData(FormType.CREATE)], async (req, res, next) => {
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
