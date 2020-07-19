'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {createAPI} = require(`../api`);
const {ExitCode, DEFAULT_PORT, HttpStatusCode, HttpStatusInfo} = require(`../const`);
const {getLogger, LogMessage, LoggerName, logger} = require(`../../logger`);
const {DB} = require(`../db`);

const serverLogger = getLogger(LoggerName.DATA_SERVER);

const createServer = (db) => {
  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(LogMessage.getStartRequest(req.url));
    next();
  });

  app.use(`/api`, createAPI(db));

  app.use((req, res) => {
    logger.error(LogMessage.getUnknownRoute(req.url));
    res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND);
  });

  app.use((err, req, res, next) => {
    logger.error(LogMessage.getError(err));
    res.status(HttpStatusCode.SERVER_ERROR).send(`Server error: ${err}`);
    next();
  });

  return app;
};

module.exports = {
  name: `--server`,
  async run(arg) {
    const db = new DB();

    try {
      await db.authenticate();
      serverLogger.info(`Connection to database succsessfully`);
    } catch (err) {
      const errorMessage = `Error connecting to database: ${err}`;
      serverLogger.error(errorMessage);
      console.error(chalk.red(errorMessage));

      process.exit(ExitCode.ERROR);
    }

    const [customPort] = arg;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;
    const app = createServer(db);

    try {
      app.listen(port);
      serverLogger.info(LogMessage.getSuccessCreatingServer(port));
    } catch (err) {
      serverLogger.error(LogMessage.getErrorCreatingServer(err));
      process.exit(ExitCode.ERROR);
    }

    console.info(chalk.green(`Listening port ${port}...`));

    return ExitCode.WORKING;
  },
  createServer
};
