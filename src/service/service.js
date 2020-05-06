'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`../const`);

const DEFAULT_COMMAND = `--help`;
const USER_COMMAND_INDEX = 2;

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand, ...commandArgs] = userInputs;

const executeCommand = async (commandName, arg) => {
  const command = Cli[commandName] || Cli[DEFAULT_COMMAND];
  try {
    await command.run(arg);
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    process.exit(ExitCode.ERROR);
  }
};

executeCommand(userCommand, commandArgs);
