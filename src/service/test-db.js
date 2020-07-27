'use strict';

const {DB} = require(`./db`);
const {getCategories} = require(`./queries`);

(async () => {
  const db = new DB();

  console.log((await db.createPost({
    date: Date.now(),
    title: `!!!Пост ни о чем!!!`,
    announce: `Пост ни о чем. Пост ни о чем. Пост ни о чем. Пост ни о чем.`,
    text: `Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. `,
    categoryIds: [6, 8]
  })).get({plain: true}));

  db.close();
})();
