'use strict';

const {DB} = require(`./db`);
const {User} = require(`./models`);
const {ADMIN} = require(`./config`);

console.log(ADMIN);

// const db = new DB();

// (async () => {
//   try {
//     await db.authenticate();
//     const userInfo = await db.checkUser(`sophie.sophia@gmail.com`, `hSiohapepSio`);

//     console.log(userInfo);// .get({plain: true}));
//   } catch (err) {
//     console.log(`Error!!! ${err}`);
//   }

//   db.close();
// })();
