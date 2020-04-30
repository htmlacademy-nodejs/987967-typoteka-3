'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`../const`);

const DEFAULT_COMMAND = `--help`;
const USER_COMMAND_INDEX = 2;

const userInputs = process.argv.slice(USER_COMMAND_INDEX);
const [userCommand, ...commandArgs] = userInputs;

const handleProcessComplite = (isSuccess) => process.exit(isSuccess ? ExitCode.SUCCESS : ExitCode.ERROR);

if (!Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run(handleProcessComplite, commandArgs);
} else {
  Cli[userCommand].run(handleProcessComplite, commandArgs);
}


