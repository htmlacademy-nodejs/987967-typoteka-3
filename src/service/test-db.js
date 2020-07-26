'use strict';

const {DB} = require(`./db`);
const {Comment} = require(`./models`);

(async () => {
  const db = new DB();

  console.log(await Comment.findByPk(`198098098`));

  db.close();
})();
