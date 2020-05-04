'use strict';

const chalk = require(`chalk`);

const HELP_MESSAGE = `Гайд:
    server <command>
    Команды:
    --version             выводит номер версии
    --help                печатает этот текст
    --generate <count>    формирует файл mocks.json`;

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(HELP_MESSAGE));
  }
};
