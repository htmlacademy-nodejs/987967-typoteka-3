'use strict';

const {generatePost} = require(`../../utils`);
const fs = require(`fs`);

const MOCK_FILE = `mocks.json`;
const DEFAULT_POSTS_COUNT = 1;
const MAX_POSTS_COUNT = 1000;
const Message = {
  WRONG_POSTS_COUNT: `Не больше ${MAX_POSTS_COUNT} публикаций`,
  FILE_ERROR: `Can't write data to file...`,
  FILE_SUCCESS: `Operation success. File created.`,
};

const generatePosts = (count) => new Array(count).fill(``).map(() => generatePost());

module.exports = {
  name: `--generate`,
  run(onComplite, arg) {
    const [userParam] = arg;
    const postsCount = parseInt(userParam, 10) || DEFAULT_POSTS_COUNT;

    if (postsCount > MAX_POSTS_COUNT) {
      console.error(Message.WRONG_POSTS_COUNT);
      onComplite(false);
      return;
    }

    const posts = JSON.stringify(generatePosts(postsCount));

    fs.writeFile(MOCK_FILE, posts, (err) => {
      if (err) {
        console.error(Message.FILE_ERROR);
        onComplite(false);
      } else {
        console.info(Message.FILE_SUCCESS);
        onComplite(true);
      }
    });
  }
};
