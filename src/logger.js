'use strict';

const pino = require(`pino`);

const logger = pino({
  level: process.env.LOG_LEVEL || `info`,
});

module.exports = {
  getLogger(name, options = {}) {
    return logger.child({
      ...options,
      name
    });
  },
};
