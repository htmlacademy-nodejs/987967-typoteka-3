'use strict';

const QueryString = require(`querystring`);
const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`./const`);
const {simplify} = require(`./utils`);
const {ServiceToExpressAdapter} = require(`./data-adapter`);
const logger = require(`../logger`).getLogger(`axios`);

const createAPI = () => {
  const api = axios.create({
    baseURL: `http://localhost:${DATA_SERVER_PORT}/api`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.request.use((req) => {
    logger.debug(`Start request at ${req.baseURL}`);
    return req;
  }, (err) => {
    logger.error(err);
    return Promise.reject(err);
  });

  api.interceptors.response.use((res) => {
    logger.debug(`End request at ${res.config.baseURL} with status ${res.status}`);
    return res;
  }, (err) => {
    logger.error(err);
    return Promise.reject(err);
  });

  return api;
};

class DataServer {
  constructor() {
    this._api = createAPI();
  }

  async getCategories(excludeEmpty = true) {
    return this._request(`/categories?${QueryString.encode({excludeEmpty})}`);
  }

  async getComments(limit, offset) {
    const queryString = limit || offset ? `?${QueryString.encode({limit, offset})}` : ``;
    const comments = await this._request(`/comments${queryString}`);
    return comments.map((it) => ServiceToExpressAdapter.getComment(it));
  }

  async getPostPreviews(sortType, limit, offset) {
    const query = simplify({sorting: sortType, limit, offset});
    const {total, posts} = await this._request(`/articles?${QueryString.encode(query)}`);

    return {
      postCount: total,
      posts: posts.map((it) => ServiceToExpressAdapter.getPostPreview(it))
    };
  }

  async getCategoryPostPreviews(categoryId, limit, offset) {
    const {total, posts, categoryName} = await this._request(`/categories/${categoryId}${limit ? `?${QueryString.encode({limit, offset})}` : ``}`);

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

  async updatePost(id, post) {
    return this._request(`/articles/${id}`, `put`, post);
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

  async createUser(data) {
    return this._request(`/user`, `post`, data);
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

  async authUser(authData) {
    return this._request(`/user/auth`, `post`, authData);
  }

  async _request(url, method = `get`, data) {
    let res;
    try {
      res = await this._api[method](url, data);
      return res.data;

    } catch (err) {
      if (err.response.status === 400) {
        const message = `Bad database request: ${err.response.data}`;
        const error = new Error(message);
        error.errors = err.response.data;
        error.isDBServer = true;

        logger.info(message);
        throw error;
      }

      logger.error(err);
      throw new Error(err);
    }
  }
}

module.exports = {
  DataServer
};
