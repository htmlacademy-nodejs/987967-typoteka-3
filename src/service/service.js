'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, CliCommandName} = require(`./const`);

const DEFAULT_COMMAND = CliCommandName.HELP;
const USER_COMMAND_INDEX = 2;

const createHelpMessage = (cliCommands) => Object.keys(cliCommands).map((it) => cliCommands[it].help).join(`\n\t\t`);

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand, ...commandArgs] = userInputs;

Cli[CliCommandName.HELP].setMessage(createHelpMessage(Cli));

const executeCommand = async (commandName, arg) => {
  const command = Cli[commandName] || Cli[DEFAULT_COMMAND];
  const exitCode = await command.run(arg);

  if (exitCode !== ExitCode.WORKING) {
    process.exit(exitCode);
  }
};

executeCommand(userCommand, commandArgs);
