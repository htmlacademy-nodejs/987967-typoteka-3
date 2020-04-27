const generate = require(`./generate`);
const help = require(`./help`);
const version = require(`./version`);

module.exports = {
  Cli: {
    [generate.name]: generate,
    [help.name]: help,
    [version.name]: version,
  }
}