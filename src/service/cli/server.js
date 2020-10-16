'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const express = require(`express`);
const expressPinoLogger = require(`express-pino-logger`);
const {createAPI} = require(`../api`);
const {ExitCode, HttpStatusCode, HttpStatusInfo, CliCommandName} = require(`../const`);
const {parseException} = require(`../utils`);
const {getLogger} = require(`../../logger`);
const {createSequelize} = require(`../create-sequelize`);
const db = require(`../db-service`);
const {DBNAME, ADMIN, PSW, PORT} = require(`../config`);
const {createSocketServer} = require(`../create-socket-server`);

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

const createApp = (database) => {
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
  help: `${CliCommandName.SERVER} - запускает REST сервис`,
  async run() {
    try {
      await createSequelize(DBNAME, ADMIN, PSW, true);
      appLogger.info(`Connection to database succsessfully`);
    } catch (err) {
      const errorMessage = `Error connecting to database: ${err}`;
      appLogger.error(errorMessage);
      console.error(chalk.red(errorMessage));

      process.exit(ExitCode.ERROR);
    }

    const app = createApp(db);
    const server = http.createServer(app);

    server.on(`error`, (message) => {
      appLogger.error(`Error starting server at port ${PORT}: ${message}`);
      process.exit(ExitCode.ERROR);
    });

    server.on(`listening`, () => {
      appLogger.info(`Server listens at port ${PORT}...`);
      console.info(chalk.green(`Listening port ${PORT}...`));
    });

    createSocketServer(server);
    server.listen(PORT);

    return ExitCode.WORKING;
  },

  createApp
};
