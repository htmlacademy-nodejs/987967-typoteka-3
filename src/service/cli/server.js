'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {createAPI} = require(`../api`);
const {ExitCode, DEFAULT_PORT, HttpStatusCode, HttpStatusInfo} = require(`../../const`);

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(`/api`, createAPI());

  app.use((req, res) =>
    res.status(HttpStatusCode.NOT_FOUND)
        .send(HttpStatusInfo.NOT_FOUND));

  app.use((err, req, res, next) => {
    res.status(HttpStatusCode.SERVER_ERROR)
        .send(HttpStatusInfo.SERVER_ERROR);
    next();
  });

  return app;
};

module.exports = {
  name: `--server`,
  run(arg) {
    const [customPort] = arg;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;
    const app = createServer();

    try {
      app.listen(port);
    } catch (err) {
      console.error(chalk.red(`Server creation error: ${err}`));
      process.exit(ExitCode.ERROR);
    }

    console.info(chalk.green(`Listening port ${port}...`));

    return ExitCode.WORKING;
  }
};
