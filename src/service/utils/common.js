'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const bcrypt = require(`bcrypt`);
const {
  MOCK_FILE,
  AVATAR_MOCK_FOLDER,
  AVATAR_FOLDER,
  PICTURE_MOCK_FOLDER,
  PICTURE_FOLDER,
  DURATION,
  ANNOUNCE_SENTENCES_COUNT,
  ID_LENGTH,
  DataFileName,
  SentenceCount,
  CategoryCount,
  CommentCount,
  VALIDATION_EXCEPTION,
  BCRYPT_SALT,
} = require(`../const`);

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array, count) =>
  new Array(count)
    .fill(``)
    .map(() => getRandomElement(array));

const removeElement = (array, index) => array.filter((it, i) => i !== index);

const getRandomUniqueElements = (array, count) => {
  let truncatedArray = array.slice();
  return new Array(count)
    .fill(``)
    .map(() => {
      if (truncatedArray.length === 0) {
        return null;
      }

      const index = getRandomInt(0, truncatedArray.length - 1);
      const element = truncatedArray[index];
      truncatedArray = removeElement(truncatedArray, index);

      return element;
    });
};

const getRandomBoolean = () => Math.random() > 0.5;
const getRandomDate = (min, max) => new Date(getRandomInt(min.valueOf(), max.valueOf())).valueOf();

const mixString = (string) => Array.from(string).sort(() => Math.random() - Math.random()).join(``);

const generateImage = (from, to) => {
  const filepath = path.resolve(to, nanoid(5));

  fs.copyFile(from, filepath, fs.constants.COPYFILE_FICLONE, (err) => {
    if (err) {
      throw err;
    }
  });

  return path.parse(filepath).base;
};

const generateUser = (names, avatars) => {
  const [firstname, lastname] = getRandomUniqueElements(names, 2);
  const email = `${firstname}.${mixString(lastname)}@gmail.com`.toLowerCase();
  const password = mixString(`${firstname}${lastname}`);

  const originalAvatar = getRandomElement(avatars);
  const avatar = generateImage(path.resolve(AVATAR_MOCK_FOLDER, originalAvatar), AVATAR_FOLDER);

  return {
    id: nanoid(6),
    firstname,
    lastname,
    email,
    originalAvatar,
    avatar,
    password,
  };
};

const generateUsers = (count, names, avatars) => Array(count).fill(``).map(() => generateUser(names, avatars));

const generateDate = () => {
  const now = Date.now();
  const past = new Date(now - DURATION);
  return getRandomDate(past, now);
};

const generatePost = ({sentences, titles, categories, comments, users, pictureFiles}) => {
  const textSentences = getRandomElements(sentences, getRandomInt(SentenceCount.MIN, SentenceCount.MAX));
  const announceSentences = getRandomUniqueElements(textSentences, ANNOUNCE_SENTENCES_COUNT);
  const date = generateDate();
  const now = Date.now();
  const originalPicture = getRandomElement(pictureFiles);
  const picture = getRandomBoolean() ? generateImage(path.resolve(PICTURE_MOCK_FOLDER, originalPicture), PICTURE_FOLDER) : ``;

  return {
    id: nanoid(ID_LENGTH),
    title: getRandomElement(titles).slice(0, 250),
    date,
    announce: announceSentences.join(`\n`).slice(0, 250),
    text: textSentences.join(`\n`).slice(0, 1000),
    categories: getRandomUniqueElements(categories, getRandomInt(CategoryCount.MIN, CategoryCount.MAX)),
    comments: getRandomElements(comments, getRandomInt(CommentCount.MIN, CommentCount.MAX)).map((it) => ({
      id: nanoid(ID_LENGTH),
      text: it.slice(0, 250),
      date: getRandomDate(date, now),
      user: getRandomElement(users),
    })),
    picture,
    originalPicture: picture && originalPicture,
    user: getRandomElement(users),
  };
};

const generatePosts = async (postCount, userCount) => {
  const [titles, sentences, categoryNames, comments, userNames, pictureFiles, avatarFiles] = await Promise.all([
    readContent(`./data/${DataFileName.TITLE}`),
    readContent(`./data/${DataFileName.DESCRIPTION}`),
    readContent(`./data/${DataFileName.CATEGORY}`),
    readContent(`./data/${DataFileName.COMMENT}`),
    readContent(`./data/${DataFileName.NAME}`),
    fs.promises.readdir(PICTURE_MOCK_FOLDER),
    fs.promises.readdir(AVATAR_MOCK_FOLDER),
  ]);

  const users = generateUsers(userCount, userNames, avatarFiles);
  const categories = generateCategories(categoryNames);
  const posts = new Array(postCount).fill(``).map(() => generatePost({
    sentences,
    titles,
    categories,
    comments,
    users,
    pictureFiles
  }));

  return {posts, categories, users};
};

const readContent = async (filename) => {
  try {
    const content = await fs.promises.readFile(filename, `utf-8`);
    return content.trim().split(`\n`).map((it) => it.trim());
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getMockPosts = async () => {
  const mockFile = path.resolve(process.cwd(), MOCK_FILE);
  return JSON.parse(await fs.promises.readFile(mockFile, `utf-8`));
};
const getMockTitles = async () => await getMockPosts().map((it) => it.title);
const getTitleList = (titles) => `<ul>${titles.map((it) => `<li>${it}</li>`).join(`\n`)}</ul>`;

const generateCategories = (names) => {
  return names.map((it) => ({
    id: nanoid(ID_LENGTH),
    name: it,
  }));
};

const getDifference = (arrayA, arrayB) => arrayA.reduce((acc, cur) => arrayB.find((it) => it === cur) ? [...acc] : [cur, ...acc], []);

const getValidationException = (messages) => ({
  type: VALIDATION_EXCEPTION,
  details: messages.map((it) => ({message: it}))
});

const parseValidationException = (exception) =>
  exception.type === VALIDATION_EXCEPTION || exception.isJoi
    ? exception.details.map((it) => it.message) : null;

const readTestMockFiles = async () => {
  const [users, categories, posts] = await Promise.all([
    fs.promises.readFile(`${process.cwd()}/data/mock-for-test/users.json`),
    fs.promises.readFile(`${process.cwd()}/data/mock-for-test/categories.json`),
    fs.promises.readFile(`${process.cwd()}/data/mock-for-test/posts.json`),
  ]);

  return {
    users: JSON.parse(users.toString()),
    categories: JSON.parse(categories.toString()),
    posts: JSON.parse(posts.toString()),
  };
};

const readJsonFile = (file) => {
  const data = fs.readFileSync(file).toString();
  return JSON.parse(data);
};

const getHash = async (password) => bcrypt.hash(password, BCRYPT_SALT);
const compareHash = async (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  getRandomDate,
  generateDate,
  generatePosts,
  getMockPosts,
  getMockTitles,
  getTitleList,
  getDifference,
  getValidationException,
  parseValidationException,
  readTestMockFiles,
  readJsonFile,
  getHash,
  compareHash,
};
