'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {DataServer} = require(`../data-server`);
const {NEW_POST_TITLE, EDIT_POST_TITLE} = require(`../const`);
const {formatDate} = require(`../../utils`);
const {HttpStatusCode} = require(`../../service/const`);
const {getLogger, LoggerName} = require(`../../logger`);
const {ExpressToServiceAdapter, ServiceToExpressAdapter} = require(`../data-adapter`);

const articleRouter = new Router();
const dataServer = new DataServer();
const logger = getLogger(LoggerName.FRONT_SERVER_API);
const upload = multer({dest: `src/express/public/img/post-images`});

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 250;
const MIN_ANNOUNCE_LENGTH = 30;
const MAX_ANNOUNCE_LENGTH = 250;
const MAX_TEXT_LENGTH = 1000;

const UpdateMethod = {
  UPDATE: `Update`,
  CREATE: `Create`,
};

const validatePost = (post) => {
  switch (true) {
    case post.title.length < MIN_TITLE_LENGTH || post.title.length > MAX_TITLE_LENGTH:
      throw new Error(`Title length must be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH}`);

    case post.announce.length < MIN_ANNOUNCE_LENGTH || post.announce.length > MAX_ANNOUNCE_LENGTH:
      throw new Error(`Announce length must be between ${MIN_ANNOUNCE_LENGTH} and ${MAX_ANNOUNCE_LENGTH}`);

    case post.categories.length === 0:
      throw new Error(`One category must be present`);

    case post.fullText.length > MAX_TEXT_LENGTH:
      throw new Error(`Text length must be less then ${MAX_TEXT_LENGTH}`);
  }
};

const checkCategories = (post, categories) => categories.map((category) => ({
  ...category,
  checked: Boolean(post.categories.find((it) => it.id === category.id))
}));

articleRouter.get(`/add`, async (req, res) => {
  const categories = await dataServer.getCategories();
  const date = new Date();
  const post = {
    dateLocalized: formatDate(date),
    dateTime: date.toISOString()
  };

  res.render(`new-post`, {
    title: NEW_POST_TITLE,
    post,
    categories,
    action: `/articles/add`
  });
});

articleRouter.get(`/:id`, (req, res) => {
  res.render(`post`);
});

articleRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});

articleRouter.get(`/edit/:id`, async (req, res) => {
  const id = req.params.id;
  const [categories, post] = await Promise.all([dataServer.getCategories(), dataServer.getPost(id)]);

  res.render(`new-post`, {
    title: EDIT_POST_TITLE,
    post,
    categories: checkCategories(post, categories),
    action: `/articles/edit/${id}`
  });
});

articleRouter.post(`/edit/:id`, upload.single(`picture`), async (req, res) => {
  const id = req.params.id;
  const postData = {
    ...req.body,
    picture: req.file ? req.file.filename : req.body[`picture-preview`],
    id,
  };

  const servicePost = ExpressToServiceAdapter.getPost(postData);

  try {
    validatePost(servicePost);
    dataServer.updatePost(servicePost);
  } catch (err) {
    const categories = await dataServer.getCategories();
    const post = ServiceToExpressAdapter.getPost(servicePost);

    res.render(`new-post`, {
      title: EDIT_POST_TITLE,
      post,
      categories: checkCategories(post, categories),
      action: `/articles/edit/${id}`,
      errorMessage: err,
    });

    logger.error(`Invalid post data: ${err}`);

    return;
  }

  res.redirect(`/my`);
});

articleRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const postData = {
    ...req.body,
    picture: req.file ? req.file.filename : req.body[`picture-preview`],
  };

  const servicePost = ExpressToServiceAdapter.getPost(postData);

  try {
    validatePost(servicePost);
    dataServer.createPost(servicePost);
  } catch (err) {
    const categories = await dataServer.getCategories();
    const post = ServiceToExpressAdapter.getPost(servicePost);

    res.render(`new-post`, {
      title: NEW_POST_TITLE,
      post,
      categories: checkCategories(post, categories),
      action: `/articles/add`,
      errorMessage: err,
    });

    logger.error(`Invalid post data: ${err}`);

    return;
  }

  res.redirect(`/my`);
});

module.exports = {
  articleRouter,
};
