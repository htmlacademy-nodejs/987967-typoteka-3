'use strict';

const axios = require(`axios`).default;
const {TIMEOUT, DATA_SERVER_PORT} = require(`./const`);
const {getLogger, LoggerName, LogMessage} = require(`../logger`);

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
    let res;
    try {
      res = await this._api.get(`/categories`);
    } catch (err) {
      throw new Error(err);
    }

    return res.data;
  }
}

module.exports = {
  DataServer
};
