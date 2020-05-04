'use strict';

const packageJSON = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJSON.version));
  }
};
