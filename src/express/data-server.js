'use strict';

const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`./const`);
const {ServiceToExpressAdapter} = require(`./data-adapter`);
const {getLogger, LoggerName, LogMessage} = require(`../logger`);
const {collectComments} = require(`../utils`);

const logger = getLogger(LoggerName.FRONT_SERVER_DATA);

const createAPI = () => {
  const api = axios.create({
    baseURL: `http://localhost:${DATA_SERVER_PORT}/api`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.request.use((req) => {
    logger.debug(LogMessage.getStartRequest(`${req.baseURL}${req.url}`));
    return req;
  });

  api.interceptors.response.use((res) => {
    logger.debug(LogMessage.getEndRequest(`${res.config.baseURL}${res.config.url}`, res.status));
    return res;
  }, (err) => {
    logger.error(LogMessage.getError(err));
    return Promise.reject(err);
  });

  return api;
};

class DataServer {
  constructor() {
    this._api = createAPI();
  }

  async getCategories() {
    return this._getRequest(`/categories`);
  }

  async getPostPreviews() {
    const posts = await this._getRequest(`/articles`);
    return posts.map((it) => ServiceToExpressAdapter.getPostPreview(it));
  }

  async getUserPosts() {
    const posts = await this._getRequest(`/articles`);
    return posts.map((it) => ServiceToExpressAdapter.getPostPreview(it));
  }

  async getUserComments() {
    const posts = await this._getRequest(`/articles`);
    const comments = collectComments(posts).map((it) => ServiceToExpressAdapter.getComment(it));
    return comments;
  }

  async getPost(id) {
    const post = ServiceToExpressAdapter.getPost(await this._getRequest(`/articles/${id}`));
    logger.info(post);
    return post;
  }

  async _getRequest(url) {
    let res;
    try {
      res = await this._api.get(url);
    } catch (err) {
      throw new Error(err);
    }
    return res.data;
  }
}

module.exports = {
  DataServer
};
