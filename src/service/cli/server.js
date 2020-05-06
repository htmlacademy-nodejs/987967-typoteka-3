'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const { ExitCode } = require(`../../const`);

const DEFAULT_PORT = 3000;
const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
}

const onConnect = (req, res) => {
  res.writeHead(HttpStatusCode.OK, {
    'Content-Type': 'text/plain'
  });

  res.end(`Test!!!`)
}

module.exports = {
  name: `--server`,
  run(arg) {
    const [customPort] = arg;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(chalk.red(`Server creation error: ${err}`));
          process.exit(ExitCode.ERROR)
        };

        console.info(chalk.green(`Listening port ${port}...`));
      });
    
    return ExitCode.WORKING
  }
};
