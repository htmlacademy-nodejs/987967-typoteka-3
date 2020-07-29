'use strict';

const express = require(`express`);
const pino = require(`express-pino-logger`)();
const path = require(`path`);
const {DEFAULT_PORT} = require(`./const`);
const {getLogger, LogMessage, LoggerName} = require(`../logger`);
const {articleRouter} = require(`./routes/articles`);
const {mainRouter} = require(`./routes/main`);
const {categoryRouter} = require(`./routes/categories`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {registerRouter} = require(`./routes/register`);
const {searchRouter} = require(`./routes/search`);

const app = express();
const loggerAPI = getLogger(LoggerName.FRONT_SERVER_API);
const loggerServer = getLogger(LoggerName.FRONT_SERVER);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, `public`)));
app.use(pino);
app.use(express.urlencoded({extended: false}));

app.use(`/`, mainRouter);
app.use(`/articles`, articleRouter);
app.use(`/categories`, categoryRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.use((req, res) => {
  loggerAPI.error(LogMessage.getUnknownRoute(req.url));
  res.status(404).render(`400.pug`);
});

app.use((err, req, res, next) => {
  const errorMessage = err.msg ? `${err.msg}: ${err.filename}, line: ${err.line}` : err;
  loggerAPI.error(errorMessage);
  res.status(500).render(`500.pug`);
  next();
});

try {
  app.listen(DEFAULT_PORT);
  loggerServer.info(LogMessage.getSuccessCreatingServer(DEFAULT_PORT));
} catch (err) {
  loggerServer.error(LogMessage.getErrorCreatingServer(err));
}
