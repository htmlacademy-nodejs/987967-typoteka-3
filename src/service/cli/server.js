'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {postsRouter} = require(`./routes/posts`);
const {ExitCode} = require(`../../const`);

const DEFAULT_PORT = 3000;
const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
const HttpStatusInfo = {
  NOT_FOUND: `Not found`,
  SERVER_ERROR: `Server error`,
};

module.exports = {
  name: `--server`,
  run(arg) {
    const [customPort] = arg;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(express.json());
    app.use(`/posts`, postsRouter);

    app.use((req, res) =>
      res.status(HttpStatusCode.NOT_FOUND)
        .send(HttpStatusInfo.NOT_FOUND));

    app.use((err, req, res, next) => {
      res.status(HttpStatusCode.SERVER_ERROR)
        .send(HttpStatusInfo.SERVER_ERROR);
      next();
    });

    app.listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(chalk.red(`Server creation error: ${err}`));
          process.exit(ExitCode.ERROR);
        }

        console.info(chalk.green(`Listening port ${port}...`));
      });

    return ExitCode.WORKING;
  }
};
