'use strict';

const {DB} = require(`./db`);
const {User} = require(`./models`);

const db = new DB();

(async () => {
  try {
    const userInfo = await db.checkUser(`sophie.sophia@gmail.com`, `hSiohapepSio`);

    console.log(userInfo);// .get({plain: true}));
  } catch (err) {
    console.log(err);
  }

  db.close();
})();
