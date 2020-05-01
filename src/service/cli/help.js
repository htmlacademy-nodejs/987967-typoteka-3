'use strict';

module.exports = {
  name: `--help`,
  run(onComplite) {
    console.info(`Гайд:
    server <command>
    Команды:
    --version             выводит номер версии
    --help                печатает этот текст
    --generate <count>    формирует файл mocks.json`);

    onComplite(true);
  }
};
