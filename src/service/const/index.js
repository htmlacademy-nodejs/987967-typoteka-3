'use strict';

const MainConst = require(`../../const`);
const CommonConst = require(`./common`);
const DbConst = require(`./db`);
const CliConst = require(`./cli`);

module.exports = {
  ...MainConst,
  ...CommonConst,
  ...DbConst,
  ...CliConst,
};
