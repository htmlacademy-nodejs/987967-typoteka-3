'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const expressPinoLogger = require(`express-pino-logger`);
const {createAPI} = require(`../api`);
const {ExitCode, DEFAULT_PORT, HttpStatusCode, HttpStatusInfo} = require(`../const`);
const {getLogger} = require(`../../logger`);
const {DB} = require(`../db`);

const pino = expressPinoLogger({
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),

    res: (res) => ({
      status: res.statusCode
    })
  },
});

const appLogger = getLogger(`app`);

const createServer = (db) => {
  const app = express();

  app.use(express.json());
  app.use(pino);

  app.use(`/api`, createAPI(db));

  app.use((req, res) => {
    req.log.error(`Wrong path: ${req.originalUrl}`);
    res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND);
  });

  app.use((err, req, res, next) => {
    appLogger.error(`Application error: ${err}`);
    res.status(HttpStatusCode.SERVER_ERROR).send(`Server error: ${err}`);
    // next();
  });

  return app;
};

module.exports = {
  name: `--server`,
  async run(arg) {
    const db = new DB();

    try {
      await db.authenticate();
      appLogger.info(`Connection to database succsessfully`);
    } catch (err) {
      const errorMessage = `Error connecting to database: ${err}`;
      appLogger.error(errorMessage);
      console.error(chalk.red(errorMessage));

      process.exit(ExitCode.ERROR);
    }

    const [customPort] = arg;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;
    const app = createServer(db);

    try {
      app.listen(port);
      appLogger.info(`Server listens at port ${port}...`);
    } catch (err) {
      appLogger.error(`Error starting server at port ${port}: ${err}`);
      process.exit(ExitCode.ERROR);
    }

    console.info(chalk.green(`Listening port ${port}...`));

    return ExitCode.WORKING;
  },
  createServer
};
