'use strict';

const {generatePost, readContent} = require(`../../utils`);
const fs = require(`fs`);
const chalk = require(`chalk`);

const MOCK_FILE = `mocks.json`;
const DEFAULT_POSTS_COUNT = 1;
const MAX_POSTS_COUNT = 1000;
const Message = {
  WRONG_POSTS_COUNT: `Не больше ${MAX_POSTS_COUNT} публикаций`,
  FILE_ERROR: `Can't write data to file...`,
  FILE_SUCCESS: `Operation success. File created.`,
};

const generatePosts = (count, data) => new Array(count).fill(``).map(() => generatePost(data));

const createMockFile = async (count) => {
  const data = {
    titles: await readContent(`./data/${DataFileName.TITLE}`),
    sentences: await readContent(`./data/${DataFileName.DESCRIPTION}`),
    categories: await readContent(`./data/${DataFileName.CATEGORY}`),
  };

  const posts = JSON.stringify(generatePosts(count, data));

  try {
    await fs.promises.writeFile(MOCK_FILE, posts);
    console.info(chalk.green(Message.FILE_SUCCESS));
  } catch (err) {
    console.error(chalk.red(Message.FILE_ERROR));
    throw new Error(err);
  }
};

const DataFileName = {
  TITLE: `titles.txt`,
  DESCRIPTION: `sentences.txt`,
  CATEGORY: `categories.txt`,
};

module.exports = {
  name: `--generate`,
  async run(arg) {
    const [userParam] = arg;
    const postsCount = parseInt(userParam, 10) || DEFAULT_POSTS_COUNT;

    if (postsCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(Message.WRONG_POSTS_COUNT));
      throw new Error(Message.WRONG_POSTS_COUNT);
    }

    await createMockFile(postsCount);
  }
};
