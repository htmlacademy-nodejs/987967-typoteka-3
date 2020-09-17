'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {generatePosts} = require(`../utils`);
const chalk = require(`chalk`);
const {
  ExitCode,
  MOCK_FILE,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
  CliCommandName,
} = require(`../const`);

const createMockFile = async (postCount, userCount) => {
  const mocks = await generatePosts(postCount, userCount);
  try {
    await fs.promises.writeFile(MOCK_FILE, JSON.stringify(mocks));
    console.info(chalk.green(`${Message.FILE_SUCCESS} ${path.resolve(process.cwd(), MOCK_FILE)}`));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.FILE_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: CliCommandName.GENERATE_JSON,
  help: `${CliCommandName.GENERATE_JSON} <post-count> <user-count> - формирует mock.json`,
  async run(arg) {
    let [postCount, userCount] = arg;
    postCount = parseInt(postCount, 10) || DEFAULT_POSTS_COUNT;
    userCount = parseInt(userCount, 10) || DEFAULT_USER_COUNT;

    if (postCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(Message.WRONG_POSTS_COUNT));
      return ExitCode.ERROR;
    }

    if (userCount > MAX_USER_COUNT) {
      console.error(chalk.red(Message.WRONG_USER_COUNT));
      return ExitCode.ERROR;
    }

    return await createMockFile(postCount, userCount);
  }
};
