'use strict';

const {generatePost, readContent, generateCategories, generateUsers} = require(`../../utils`);
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
  DataFileName,
  AVATAR_MOCK_FOLDER,
  PICTURE_MOCK_FOLDER,
} = require(`../const`);

const generatePosts = (count, data, users, pictures) => new Array(count).fill(``).map(() => generatePost(data, users, pictures));

const createSQLFile = async (postCount, userCount) => {
  const data = {
    titles: await readContent(`./data/${DataFileName.TITLE}`),
    sentences: await readContent(`./data/${DataFileName.DESCRIPTION}`),
    categories: await generateCategories(`./data/${DataFileName.CATEGORY}`),
    comments: await readContent(`./data/${DataFileName.COMMENT}`),
    names: await readContent(`./data/${DataFileName.NAME}`),
  };

  const pictures = await fs.promises.readdir(PICTURE_MOCK_FOLDER);
  const avatars = await fs.promises.readdir(AVATAR_MOCK_FOLDER);

  const users = generateUsers(userCount, data.names, avatars);
  const posts = generatePosts(postCount, data, users, pictures);

  const userSQL = createUsers(users);
  const categorySQL = createCategories(data.categories);
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
  name: `--fill`,
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
