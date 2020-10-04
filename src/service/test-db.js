'use strict';

const {createSequelize} = require(`./create-sequelize`);
const db = require(`./db-services`);

(async () => {
  const seq = await createSequelize();

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
