'use strict';

const QueryString = require(`querystring`);
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
    return this._request(`/categories`);
  }

  async getComments(limit, offset) {
    return this._request(`/comments?${QueryString.encode({limit, offset})}`);
  }

  async getPostPreviews(sortType, limit, offset) {
    const {total, posts} = await this._request(`/articles?${QueryString.encode({sorting: sortType, limit, offset})}`);

    return {
      postCount: total,
      posts: posts.map((it) => ServiceToExpressAdapter.getPostPreview(it))
    };
  }

  async getUserPosts() {
    const posts = await this._request(`/articles`);
    return posts.map((it) => ServiceToExpressAdapter.getPostPreview(it));
  }

  async getUserComments() {
    const posts = await this._request(`/articles`);
    const comments = collectComments(posts).map((it) => ServiceToExpressAdapter.getComment(it));
    return comments;
  }

  async getPost(id) {
    const post = ServiceToExpressAdapter.getPost(await this._request(`/articles/${id}`));
    return post;
  }

  async updatePost(post) {
    return this._request(`/articles/${post.id}`, `put`, post);
  }

  async createPost(post) {
    return this._request(`/articles`, `post`, post);
  }

  async search(query) {
    const queryString = QueryString.encode({query});
    return (await this._request(`/search?${queryString}`)).map((it) => ServiceToExpressAdapter.getPost(it));
  }

  async _request(url, method = `get`, data) {
    let res;
    try {
      res = await this._api[method](url, data);
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
    return res.data;
  }
}

module.exports = {
  DataServer
};
