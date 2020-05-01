'use strict';

const {
  DURATION,
  MIN_SENTENCES_COUNT,
  MAX_SENTENCES_COUNT,
  ANNOUNCE_SENTENCES_COUNT,
  TITLES,
  SENTENCES,
  CATEGORIES,
} = require(`./const`);

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
const getRandomDate = (min, max) => new Date(getRandomInt(min.valueOf(), max.valueOf()));

const generateDate = () => {
  const now = Date.now();
  const past = new Date(now - DURATION);
  const [date, time] = getRandomDate(past, now).toLocaleString().split(`, `);

  return `${date.split(`/`).reverse().join(`-`)}, ${time}`;
};


const generatePost = () => {
  const textSentences = getRandomElements(SENTENCES, getRandomInt(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT));
  const announceSentences = getRandomUniqueElements(textSentences, ANNOUNCE_SENTENCES_COUNT);

  return {
    title: getRandomElement(TITLES),
    createdDate: generateDate(),
    announce: announceSentences.join(`\n`),
    fullText: textSentences.join(`\n`),
    сategory: getRandomElement(CATEGORIES),
  };
};

module.exports = {
  getRandomInt,
  getRandomElement,
  getRandomElements,
  getRandomUniqueElements,
  getRandomBoolean,
  getRandomDate,
  generateDate,
  generatePost,
};
