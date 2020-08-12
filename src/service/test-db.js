'use strict';

const {DB} = require(`./db`);
const {getCategories} = require(`./queries`);
const {Post} = require(`./models`);

(async () => {
  const db = new DB();

  await db.createPost({
    title: `Some title had a length equals at least 30 chars`,
    announce: `Announce Announce Announce Announce`,
    categories: [1],
    // picture: {
    //   name: `123`,
    //   originalName: `321`
    // }
  });

  // console.log((await db.updatePost(41, {
  //   title: `!!!Пост Обовсем!!!`,
  //   announce: `Пост ни о чем. Пост ни о чем. Пост ни о чем. Пост ни о чем.`,
  //   text: `Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. Да собвственно ни о чем писать не собираюсь. `,
  //   categories: [{id: 6}]
  // })));

  db.close();
})();
