'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const expressPinoLogger = require(`express-pino-logger`);
const {createAPI} = require(`../api`);
const {ExitCode, DEFAULT_PORT, HttpStatusCode, HttpStatusInfo, CliCommandName} = require(`../const`);
const {parseException} = require(`../utils`);
const {getLogger} = require(`../../logger`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-services`);
const {DBNAME, ADMIN, PSW} = require(`../config`);

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

const createServer = (database) => {
  const app = express();

  app.use(express.json());
  app.use(pino);

  app.use(`/api`, createAPI(database));

  app.use((req, res) => {
    req.log.error(`Wrong path: ${req.originalUrl}`);
    res.status(HttpStatusCode.NOT_FOUND).send(HttpStatusInfo.NOT_FOUND);
  });

  app.use((err, req, res, next) => {
    const validationException = parseException(err);

    if (validationException) {
      appLogger.error(`Validation error: ${validationException}`);
      res.status(HttpStatusCode.BAD_REQUEST).json(validationException);
    } else {
      appLogger.error(`Application error: ${err}`);
      res.status(HttpStatusCode.SERVER_ERROR).send(`Server error`);
      next();
    }
  });

  return app;
};

module.exports = {
  name: CliCommandName.SERVER,
  help: `${CliCommandName.SERVER} - запускает приложение`,
  async run(arg) {
    try {
      await createSequelize(DBNAME, ADMIN, PSW, true);
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
