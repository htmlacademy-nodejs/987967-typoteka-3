'use strict';

const chalk = require(`chalk`);
const {ExitCode, CliCommandName} = require(`../const`);


module.exports = {
  name: CliCommandName.HELP,
  help: `${CliCommandName.HELP} - печатает этот текст`,

  setMessage(message) {
    this.message = message;
  },

  run() {
    const helpMessage = `Гайд:\n\tservice <command>\n\n\tКоманды:\n\t\t${this.message}\n\nПример создания БД: npm run start:service -- --generate-db 50 10\n\nЗапуск приложения: npm run start\n\nДеплой: https://typoteka.shgk.me, админ: isabelle.thoasm@gmail.com / obehselImsaaTl`;

    console.info(chalk.grey(helpMessage));
    return ExitCode.SUCCESS;
  }
};
