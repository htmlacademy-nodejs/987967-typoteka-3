'use strict';

const fs = require(`fs`);
const Sequelize = require(`sequelize`);
const {createDataBase, dropDataBase, addPagination} = require(`./utils`);
const {Post} = require(`./models`);
const {getCategoryPosts} = require(`./queries`);
const {DB} = require(`./db`);


(async () => {
  console.log(addPagination);
  // const db = new DB(`typoteka`);
  // const posts = await getCategoryPosts(db.sequelize, 5);
  // console.log(posts);
})();
