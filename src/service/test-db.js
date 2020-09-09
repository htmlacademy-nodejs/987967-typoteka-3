'use strict';

const {DB} = require(`./db`);

const db = new DB();

(async () => {
  try {
    await db.createUser({
      email: `d.orlov777@gmail.com`,
      firstname: `Dimitriy`,
      lastname: `Orloviy`,
      avatar: {
        originalName: `rozha.jpg`,
        name: `fsddfgfg`
      },
      password: `dkfsjgkldasasdffgjlkdsf`
    });
    console.log(`Ok`);
  } catch (err) {
    console.log(err);
  }

  db.close();
})();
