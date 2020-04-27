'use strict';

const {getRandomDate, getRandomElement, getRandomElements, getRandomUniqueElements, getRandomInt} = require(`../../utils`);
const fs = require(`fs`);

const MOCK_FILE = `mocks.json`;
const DEFAULT_POSTS_COUNT = 1;
const MAX_POSTS_COUNT = 1000;
const Message = {
  WRONG_POSTS_COUNT: `Не больше 1000 публикаций`,
  FILE_ERROR: `Can't write data to file...`,
  FILE_SUCCESS: `Operation success. File created.`,
};
const DURATION = 1000 * 60 * 60 * 24 * 90;
const MIN_SENTENCES_COUNT = 5;
const MAX_SENTENCES_COUNT = 50;
const ANNOUNCE_SENTENCES_COUNT = 5;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево.Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами.Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const generateDate = () => {
  const now = new Date();
  const past = new Date(now.valueOf() - DURATION);
  const [date, time] = getRandomDate(past, now).toLocaleString().split(`, `);

  return `${date.split(`/`).reverse().join(`-`)}, ${time}`;
};


const generatePost = () => {
  const textSentences = getRandomElements(SENTENCES, getRandomInt(MIN_SENTENCES_COUNT, MAX_SENTENCES_COUNT));
  const announceSentences = getRandomUniqueElements(textSentences, ANNOUNCE_SENTENCES_COUNT);

  return {
    title: getRandomElement(TITLES),
    createdDate: generateDate(),
    announce: announceSentences.join(String.fromCharCode(10)),
    fullText: textSentences.join(`\n`),
    сategory: getRandomElement(CATEGORIES),
  };
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
