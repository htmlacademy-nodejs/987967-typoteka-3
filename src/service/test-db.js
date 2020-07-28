'use strict';

const {DB} = require(`./db`);
const {getCategories} = require(`./queries`);
const {Post} = require(`./models`);

(async () => {
  const db = new DB();

  await db.updatePost(14, {
    title: `Updated title Updated title Updated title Updated title Updated title`,
    categories: [{id: 7}]
  });

  // console.log((await db.updatePost(41, {
  //   title: `!!!Пост Обовсем!!!`,
  //   announce: `Пост ни о чем. Пост ни о чем. Пост ни о чем. Пост ни о чем.`,
  //   text: `Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. `,
  //   categories: [{id: 6}]
  // })));

  db.close();
})();
