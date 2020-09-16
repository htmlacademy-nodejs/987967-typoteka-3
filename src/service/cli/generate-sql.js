'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const {generatePosts} = require(`../utils`);
const {createUsersSQL, createCategoriesSQL, createPostsSQL} = require(`../utils`);
const {
  ExitCode,
  SQL_FILE,
  MOCK_FILE,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
  CliCommandName,
} = require(`../const`);

const createSQLFile = async (postCount, userCount) => {
  const {users, posts, categories} = await generatePosts(postCount, userCount);

  const userSQL = await createUsersSQL(users);
  const categorySQL = createCategoriesSQL(categories);
  const postSQL = createPostsSQL(posts);

  const content = [userSQL, categorySQL, postSQL].join(`\n`);

  try {
    await fs.promises.writeFile(MOCK_FILE, JSON.stringify({categories, users, posts}));
    await fs.promises.writeFile(SQL_FILE, content);
    console.info(chalk.green(`${Message.FILE_SUCCESS} ${path.resolve(process.cwd(), SQL_FILE)}, ${path.resolve(process.cwd(), MOCK_FILE)}`));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.FILE_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: CliCommandName.GENERATE_SQL,
  help: `${CliCommandName.GENERATE_SQL} <post-count> <user-count> - формирует SQL-файл для наполнения базы данных`,
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
