'use strict';

const {generatePosts} = require(`../../utils`);
const {createUsers, createCategories, createPosts} = require(`../fill-database`);
const fs = require(`fs`);
const chalk = require(`chalk`);
const {
  ExitCode,
  SQL_FILE,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
} = require(`../const`);

const createSQLFile = async (postCount, userCount) => {
  const {users, posts, categories} = generatePosts(postCount, userCount);

  const userSQL = createUsers(users);
  const categorySQL = createCategories(categories);
  const postSQL = createPosts(posts);

  const content = [userSQL, categorySQL, postSQL].join(`\n`);

  try {
    await fs.promises.writeFile(SQL_FILE, content);
    console.info(chalk.green(Message.FILE_SUCCESS));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.FILE_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate-sql`,
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

    return await createSQLFile(postCount, userCount);
  }
};
