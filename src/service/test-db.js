'use strict';

const path = require(`path`);
const {DB} = require(`./db`);

const {generateCategories, generateUsers, generatePost, readContent} = require(`../utils`);
const {DataFileName, AVATAR_MOCK_FOLDER, PICTURE_MOCK_FOLDER} = require(`./const`);
const fs = require(`fs`);


(async () => {
  const userCount = 3;
  const postCount = 10;

  // const data = {
  //   titles: await readContent(`./data/${DataFileName.TITLE}`),
  //   sentences: await readContent(`./data/${DataFileName.DESCRIPTION}`),
  //   categories: await generateCategories(`./data/${DataFileName.CATEGORY}`),
  //   comments: await readContent(`./data/${DataFileName.COMMENT}`),
  //   names: await readContent(`./data/${DataFileName.NAME}`),
  // };

  // const pictures = await fs.promises.readdir(PICTURE_MOCK_FOLDER);
  // const avatars = await fs.promises.readdir(AVATAR_MOCK_FOLDER);

  // const users = generateUsers(userCount, data.names, avatars);
  // const posts = new Array(postCount).fill(``).map(() => generatePost(data, users, pictures));

  const db = new DB();

  try {
    await db.reset();
    // console.log(await db.createUser({
    //   email: `qwer.ty@mail.com`,
    //   firstname: `Qwer`,
    //   lastname: `Ty`,
    //   password: `qwertytrewq`,
    //   avatar: `ytrewq`,
    //   originalAvatar: `qwerty`,
    // }));

    await db.createCategories([`category-1`, `category-2`, `category-3`]);

    await db.createPost({
      date: Date.now(),
      title: `qqqqqqwwwweeeerrrttttyy`,
      announce: `yyyyyttttrrrrreeeeewwwwqqqq`,
      text: null,
      picture: `ytrewq`,
      originalPicture: `qwerty`,
      categoryIds: [1, 2, 3]
    });
  } catch (err) {
    throw err;
  }

  db.sequelize.close();
})();
