'use strict';

const {getLogger} = require(`../logger`);
const {LoggerName} = require(`./const`);

module.exports = {
  appLogger: getLogger(LoggerName.APP),
  axiosLogger: getLogger(LoggerName.AXIOS),
};
