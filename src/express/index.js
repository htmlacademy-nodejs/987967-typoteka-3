'use strict';

const express = require(`express`);
const expressPinoLogger = require(`express-pino-logger`);
const path = require(`path`);
const {DEFAULT_PORT} = require(`./const`);
const {getLogger} = require(`../logger`);
const {articleRouter} = require(`./routes/articles`);
const {mainRouter} = require(`./routes/main`);
const {categoryRouter} = require(`./routes/categories`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {registerRouter} = require(`./routes/register`);
const {searchRouter} = require(`./routes/search`);

const pino = expressPinoLogger({
  req: (req) => ({
    method: req.method,
    url: req.url,
  }),

  res: (res) => ({
    status: res.statusCode
  })
});

const app = express();
const loggerApp = getLogger(`app`);

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
  res.status(404).render(`400.pug`);
});

app.use((err, req, res, next) => {
  const errorMessage = err.msg ? `${err.msg}: ${err.filename}, line: ${err.line}` : err;
  loggerApp.error(errorMessage);
  res.status(500).render(`500.pug`);
  next();
});

try {
  app.listen(DEFAULT_PORT);
  loggerApp.info(`Listenint port ${DEFAULT_PORT}...`);
} catch (err) {
  loggerApp.error(`Can't start server: ${err}`);
}
