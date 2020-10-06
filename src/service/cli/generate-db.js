'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const {generatePosts} = require(`../utils`);
const {createDataBase} = require(`../utils`);
const {ADMIN, PSW, DBNAME} = require(`../config`);
const {createSequelize} = require(`../create-sequelize`);
const {fillDataBase} = require(`../db-service`);
const {
  ExitCode,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
  MOCK_FILE,
  CliCommandName,
} = require(`../const`);

const createDB = async (postCount, userCount) => {
  try {
    const {users, posts, categories} = await generatePosts(postCount, userCount);

    await fs.promises.writeFile(MOCK_FILE, JSON.stringify({categories, users, posts}));
    await createDataBase(DBNAME);

    const sequelize = await createSequelize(DBNAME, ADMIN, PSW, true);
    await fillDataBase(sequelize, posts, users, categories);
    sequelize.close();

    console.info(chalk.green(Message.DB_SUCCESS));
    console.info(chalk.green(`Open ${MOCK_FILE} to see the generated data`));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.DB_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: CliCommandName.GENERATE_DB,
  help: `${CliCommandName.GENERATE_DB} <post-count> <user-count> - формирует базу данных`,
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

    return createDB(postCount, userCount);
  }
};
