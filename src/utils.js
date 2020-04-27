'use strict';

const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};
module.exports.getRandomInt = getRandomInt;

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];
module.exports.getRandomElement = getRandomElement;

module.exports.getRandomElements = (array, count) =>
  new Array(count)
    .fill(``)
    .map(() => getRandomElement(array));

const removeElement = (array, index) => {
  const result = array.slice();

  switch (true) {
    case index === 0:
      result.shift();
      return result;

    case index === array.length - 1:
      result.pop();
      return result;

    case index >= array.length:
      return result;

    default:
      return result.slice(0, index).concat(result.slice(index + 1, result.length));
  }
};

module.exports.getRandomUniqueElements = (array, count) => {
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

module.exports.getRandomBoolean = () => Math.random() > 0.5;

module.exports.getRandomDate = (min, max) => new Date(getRandomInt(min.valueOf(), max.valueOf()));
