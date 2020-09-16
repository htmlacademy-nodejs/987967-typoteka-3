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
    const helpMessage = `Гайд:\n\tservice <command>\n\n\tКоманды:\n\t\t${this.message}`;

    console.info(chalk.grey(helpMessage));
    return ExitCode.SUCCESS;
  }
};
