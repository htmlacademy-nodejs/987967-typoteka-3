'use strict';

const fs = require(`fs`);
const {createDataBase, dropDataBase, addPagination} = require(`./utils`);
const {Post} = require(`./models`);
const {getCategoryPosts} = require(`./queries`);
const {DB} = require(`./db`);


(async () => {
  const db = new DB(`typoteka`);

  try {
    const categpry = await db.getCategoryByName(`ITI`);
    console.log(categpry);
  } catch (err) {
    console.log(err);
  }

  db.close();
})();
