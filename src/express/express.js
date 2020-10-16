'use strict';

const http = require(`http`);
const path = require(`path`);
const express = require(`express`);
const expressPinoLogger = require(`express-pino-logger`);
const expressSession = require(`express-session`);
const {HttpStatusCode, SESSION_NAME} = require(`./const`);
const {appLogger} = require(`./logger`);
const {articleRouter} = require(`./routes/articles`);
const {mainRouter} = require(`./routes/main`);
const {categoryRouter} = require(`./routes/categories`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {registerRouter} = require(`./routes/register`);
const {searchRouter} = require(`./routes/search`);
const {SECRET, SERVICE_SOCKET_PORT, EXPRESS_SOCKET_PORT, PORT} = require(`./config`);
const {privateRoute} = require(`./middlewares`);
const {getSequelizeStore} = require(`./sequelize-store`);
const {render} = require(`./utils`);
const {createSocketProxy} = require(`./socket-proxy`);

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

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(expressSession({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  name: SESSION_NAME,
  store: getSequelizeStore(expressSession.Store),
  cookie: {
    sameSite: true,
    httpOnly: true,
  }
}));

app.use(express.static(path.resolve(__dirname, `public`)));
app.use(pino);
app.use(express.urlencoded({extended: false}));

app.use(`/`, mainRouter);
app.use(`/articles`, articleRouter);
app.use(`/categories`, privateRoute, categoryRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, privateRoute, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.use((req, res) => {
  render(`400`, {}, req, res, HttpStatusCode.NOT_FOUND);
});

app.use((err, req, res, next) => {
  const errorMessage = err.msg ? `${err.msg}: ${err.filename}, line: ${err.line}` : err;
  appLogger.error(errorMessage);
  render(`500`, {}, req, res, HttpStatusCode.SERVER_ERROR);
  next();
});

const server = http.createServer(app);

server.on(`error`, (message) => {
  appLogger.error(`Can't start server: ${message}`);
});

server.on(`listening`, () => {
  appLogger.info(`Listening port ${PORT}...`);
});

server.listen(PORT);
createSocketProxy(SERVICE_SOCKET_PORT, EXPRESS_SOCKET_PORT);
