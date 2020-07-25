'use strict';

const {DB} = require(`./db`);
const {getPostsByCategory} = require(`./queries`);

(async () => {
  const db = new DB();

  await getPostsByCategory(db.sequelize, `1`, 10, 0);

  db.close();
})();
