'use strict';

const {configureSequelize} = require(`./configure-sequelize`);
const db = require(`./db-services`);

(async () => {
  const seq = await configureSequelize();

  try {
    const result = await db.getAdminId();
    console.log(result);
    const result2 = await db.getAdminId();
    console.log(result2);
  } catch (err) {
    console.log(err);
  }
  seq.close();
})();
