'use strict';

const fs = require(`fs`);
const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  MOCK_FILE,
  AVATAR_MOCK_FOLDER,
  AVATAR_FOLDER,
  PICTURE_MOCK_FOLDER,
  PICTURE_FOLDER,
  DURATION,
  MIN_SENTENCES_COUNT,
  MAX_SENTENCES_COUNT,
  MIN_COMMENT_COUNT,
  MAX_COMMENT_COUNT,
  MIN_CATEGORY_COUNT,
  MAX_CATEGORY_COUNT,
  ANNOUNCE_SENTENCES_COUNT,
  ID_LENGTH,
  DataFileName,
} = require(`./service/const`);

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
  const textSentences = getRandomElements(sentences, getRandomInt(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT));
  const announceSentences = getRandomUniqueElements(textSentences, ANNOUNCE_SENTENCES_COUNT);
  const createdDate = generateDate();
  const now = Date.now();
  const originalPicture = getRandomElement(pictureFiles);
  const picture = getRandomBoolean() ? generateImage(path.resolve(PICTURE_MOCK_FOLDER, originalPicture), PICTURE_FOLDER) : ``;

  return {
    id: nanoid(ID_LENGTH),
    title: getRandomElement(titles).slice(0, 250),
    createdDate,
    announce: announceSentences.join(`\n`).slice(0, 250),
    fullText: textSentences.join(`\n`).slice(0, 1000),
    categories: getRandomUniqueElements(categories, getRandomInt(MIN_CATEGORY_COUNT, MAX_CATEGORY_COUNT)),
    comments: getRandomElements(comments, getRandomInt(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT)).map((it) => ({
      id: nanoid(ID_LENGTH),
      text: it.slice(0, 250),
      date: getRandomDate(createdDate, now),
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

const sendResponse = (status, message, res) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>987967-typoteka-3</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = status;
  res.writeHead(status, {
    "content-type": `text/html; charset=utf-8`
  });
  res.end(template);
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

const formatNumber = (number) => `${number < 10 ? `0` : ``}${number}`;

const sortCommentsByDate = (comments) => comments.slice().sort((a, b) => b.date - a.date);
const sortPostsByDate = (posts) => posts.slice().sort((a, b) => b.createdDate - a.createdDate);
const sortPostsByPopular = (posts) => posts.slice().sort((a, b) => b.comments.length - a.comments.length);
const collectComments = (posts) => posts.reduce((acc, cur) => {
  const comments = cur.comments.map((it) => ({
    ...it,
    parentPost: cur
  }));

  return [...acc, ...comments];
}, []);

const formatDate = (date) => {
  const days = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);

  return `${days}.${month}.${date.getFullYear()}`;
};

const formatDateTime = (date) => {
  const minutes = formatNumber(date.getMinutes());
  const hours = formatNumber(date.getHours());

  return `${formatDate(date)}, ${hours}:${minutes}`;
};

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  getRandomDate,
  generateDate,
  generatePosts,
  readContent,
  sendResponse,
  getMockPosts,
  getMockTitles,
  getTitleList,
  formatNumber,
  sortPostsByDate,
  sortPostsByPopular,
  sortCommentsByDate,
  collectComments,
  formatDateTime,
  formatDate,
};
