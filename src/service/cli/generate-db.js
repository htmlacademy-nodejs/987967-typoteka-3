'use strict';

const chalk = require(`chalk`);
const {generatePosts} = require(`../../utils`);
const {
  ExitCode,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
} = require(`../const`);
const {DB} = require(`../db`);

const createDB = async (postCount, userCount) => {
  const db = new DB();
  const {users, posts, categories} = generatePosts(postCount, userCount);

  try {
    db.authenticate();
    db.createMockDB(posts, users, categories);
    db.close();

    console.info(chalk.green(Message.DB_SUCCESS));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.DB_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate-db`,
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

    return await createDB(postCount, userCount);
  }
};
