'use strict';

const packageJSON = require(`../../../package.json`);
const chalk = require(`chalk`);
const {ExitCode, CliCommandName} = require(`../const`);

module.exports = {
  name: CliCommandName.VERSION,
  help: `${CliCommandName.VERSION} - выводит номер версии`,
  run() {
    console.info(chalk.blue(packageJSON.version));
    return ExitCode.SUCCESS;
  }
};
