'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE, POST_PREVIEW_COUNT, TitleLength, AnnounceLength, TextLength} = require(`../const`);
const {ExpressToServiceAdapter, ServiceToExpressAdapter} = require(`../data-adapter`);
const {getPagination, formatDate} = require(`../utils`);

const articleRouter = new Router();
const dataServer = new DataServer();
const upload = multer({dest: `src/express/public/img/post-images`});

const validatePost = (post) => {
  switch (true) {
    case post.title.length < TitleLength.MIN || post.title.length > TitleLength.MAX:
      throw new Error(`Title length must be between ${TitleLength.MIN} and ${TitleLength.MAX}`);

    case post.announce.length < AnnounceLength.MIN || post.announce.length > AnnounceLength.MAX:
      throw new Error(`Announce length must be between ${AnnounceLength.MIN} and ${AnnounceLength.MAX}`);

    case post.categories.length === 0:
      throw new Error(`One category must be present`);

    case post.text.length > TextLength.MAX:
      throw new Error(`Text length must be less then ${TextLength.MAX}`);
  }
};

const checkCategories = (post, categories) => categories.map((category) => ({
  ...category,
  checked: !!post.categories.find((it) => it.id === category.id)
}));

const addCategoryCount = (postCategories, categories) => categories.filter((category) => postCategories.find((it) => it.id === category.id));

articleRouter.get(`/add`, async (req, res, next) => {
  try {
    const categories = await dataServer.getCategories(false);
    const date = new Date();
    const post = {
      dateLocalized: formatDate(date),
      dateTime: date,
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

articleRouter.get(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const [categories, post] = await Promise.all([dataServer.getCategories(), dataServer.getPost(id)]);

    post.categories = addCategoryCount(post.categories, categories);
    res.render(`post`, {post});
  } catch (err) {
    next(err);
  }
});

articleRouter.get(`/category/:id`, async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const {id} = req.params;

  let categories;
  let categoryName;
  let posts;
  let postCount;

  try {
    [categories, {posts, postCount, categoryName}] = await Promise.all([
      dataServer.getCategories(true),
      dataServer.getCategoryPostPreviews(id, POST_PREVIEW_COUNT, (page - 1) * POST_PREVIEW_COUNT),
    ]);
  } catch (err) {
    next(err);
    return;
  }

  const pageCount = Math.ceil(Number(postCount) / POST_PREVIEW_COUNT);

  res.render(`articles-by-category`, {
    categories,
    categoryName,
    posts,
    pagination: getPagination(page, pageCount, req.originalUrl.replace(/\?.+/, ``)),
  });
});

articleRouter.get(`/edit/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const [categories, post] = await Promise.all([dataServer.getCategories(false), dataServer.getPost(id)]);

    res.render(`new-post`, {
      title: EDIT_POST_TITLE,
      post,
      categories: checkCategories(post, categories),
      action: `/articles/edit/${id}`
    });
  } catch (err) {
    next(err);
  }
});

articleRouter.post(`/edit/:id`, upload.single(`picture`), async (req, res, next) => {
  const id = req.params.id;
  const postData = {
    ...req.body,
    picture: req.file ? {
      name: req.file.filename,
      originalName: req.body[`picture-preview`]
    } : undefined,
  };

  const servicePost = ExpressToServiceAdapter.getPost(postData);

  try {
    validatePost(servicePost);
    await dataServer.updatePost(id, servicePost);
  } catch (err) {
    const categories = await dataServer.getCategories(false);
    const post = ServiceToExpressAdapter.getPost(servicePost);

    res.render(`new-post`, {
      title: EDIT_POST_TITLE,
      post,
      categories: checkCategories(post, categories),
      action: `/articles/edit/${id}`,
      errorMessage: err,
    });

    next(err);

    return;
  }

  res.redirect(`/my`);
});

articleRouter.post(`/add`, upload.single(`picture`), async (req, res, next) => {
  const postData = {
    ...req.body,
    picture: req.file ? {
      name: req.file.filename,
      originalName: req.body[`picture-preview`]
    } : undefined,
  };
  const servicePost = ExpressToServiceAdapter.getPost(postData);

  try {
    validatePost(servicePost);
    await dataServer.createPost(servicePost);
  } catch (err) {
    const categories = await dataServer.getCategories(false);
    const post = ServiceToExpressAdapter.getPost(servicePost);

    res.render(`new-post`, {
      title: NEW_POST_TITLE,
      post,
      categories: checkCategories(post, categories),
      action: `/articles/add`,
      errorMessage: err,
    });

    next(err);

    return;
  }

  res.redirect(`/my`);
});

module.exports = {
  articleRouter,
};
