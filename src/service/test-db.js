'use strict';

const {DB} = require(`./db`);
const {getCategories} = require(`./queries`);

(async () => {
  const db = new DB();

  console.log(await db.createCategory(`С рюмочкой`));

  db.close();
})();
