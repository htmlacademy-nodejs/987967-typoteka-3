'use strict';

const {generatePost, readContent, generateCategories, generateUsers} = require(`../../utils`);
const fs = require(`fs`);
const chalk = require(`chalk`);
const {
  ExitCode,
  MOCK_FILE,
  Message,
  DEFAULT_POSTS_COUNT,
  DEFAULT_USER_COUNT,
  MAX_POSTS_COUNT,
  MAX_USER_COUNT,
  DataFileName,
  AVATAR_MOCK_FOLDER,
} = require(`../const`);

const generatePosts = (count, data) => new Array(count).fill(``).map(() => generatePost(data));

const createMockFile = async (postCount, userCount) => {
  const data = {
    titles: await readContent(`./data/${DataFileName.TITLE}`),
    sentences: await readContent(`./data/${DataFileName.DESCRIPTION}`),
    categories: await generateCategories(`./data/${DataFileName.CATEGORY}`),
    comments: await readContent(`./data/${DataFileName.COMMENT}`),
    names: await readContent(`./data/${DataFileName.NAME}`),
  };

  const avatars = await fs.promises.readdir(AVATAR_MOCK_FOLDER);
  const users = generateUsers(userCount, data.names, avatars);
  const posts = JSON.stringify(generatePosts(postCount, data, users));

  try {
    await fs.promises.writeFile(MOCK_FILE, posts);
    console.info(chalk.green(Message.FILE_SUCCESS));
    return ExitCode.SUCCESS;
  } catch (err) {
    console.error(chalk.red(`${Message.FILE_ERROR}: ${err}`));
    return ExitCode.ERROR;
  }
};

module.exports = {
  name: `--generate`,
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
