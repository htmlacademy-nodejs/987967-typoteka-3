'use strict';

const {getHash, compareHash} = require(`./utils`);

(async () => {
  const password = `my_password`;
  const password2 = `my_passwоrd`;

  try {
    const hash = await getHash(password);
    console.log(hash);

    console.log(await compareHash(password, hash));
    console.log(await compareHash(password2, hash));
  } catch (err) {
    console.log(err);
  }
})();
