'use strict';

const QueryString = require(`querystring`);
const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`./const`);
const {ServiceToExpressAdapter} = require(`./data-adapter`);
const {getLogger, LoggerName, LogMessage} = require(`../logger`);
const {collectComments} = require(`../utils/common`);

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

  async getCategories(excludeEmpty) {
    return this._request(`/categories?${QueryString.encode({excludeEmpty})}`);
  }

  async getComments(limit, offset) {
    const comments = await this._request(`/comments?${QueryString.encode({limit, offset})}`);
    return comments.map((it) => ServiceToExpressAdapter.getComment(it));
  }

  async getPostPreviews(sortType, limit, offset) {
    const {total, posts} = await this._request(`/articles?${QueryString.encode({sorting: sortType, limit, offset})}`);

    return {
      postCount: total,
      posts: posts.map((it) => ServiceToExpressAdapter.getPostPreview(it))
    };
  }

  async getCategoryPostPreviews(categoryId, limit, offset) {
    const {total, posts, category_name: categoryName} = await this._request(`/categories/${categoryId}${limit ? `?${QueryString.encode({limit, offset})}` : ``}`);

    return {
      postCount: total,
      categoryName,
      posts: posts.map((it) => ServiceToExpressAdapter.getPostPreview(it))
    };
  }

  async getPost(id) {
    const post = ServiceToExpressAdapter.getPost(await this._request(`/articles/${id}`));
    return post;
  }

  async updatePost(post) {
    return this._request(`/articles/${post.id}`, `put`, post);
  }

  async updateCategory(id, name) {
    return this._request(`/categories/${id}`, `put`, {name});
  }

  async createPost(post) {
    return this._request(`/articles`, `post`, post);
  }

  async createCategory(name) {
    return this._request(`/categories`, `post`, {name});
  }

  async search(query) {
    const queryString = QueryString.encode({query});
    return (await this._request(`/search?${queryString}`)).map((it) => ServiceToExpressAdapter.getPost(it));
  }

  async deletePost(id) {
    return this._request(`/articles/${id}`, `delete`);
  }

  async deleteComment(postId, commentId) {
    return this._request(`/articles/${postId}/comments/${commentId}`, `delete`);
  }

  async deleteCategory(id) {
    return this._request(`/categories/${id}`, `delete`);
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
