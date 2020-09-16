'use strict';

const commonConst = require(`./common`);
const dbConst = require(`./db`);
const cliConst = require(`./cli`);

module.exports = {
  ...commonConst,
  ...dbConst,
  ...cliConst,
};
