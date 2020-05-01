'use strict';

const packageJSON = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run(onComplite) {
    console.info(packageJSON.version);
    onComplite(true);
  }
};
