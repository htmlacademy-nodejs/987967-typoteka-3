'use strict';

const express = require(`express`);
const {DEFAULT_PORT} = require(`./const`);
const {articleRouter} = require(`./routes/articles`);
const {mainRouter} = require(`./routes/main`);
const {categoryRouter} = require(`./routes/categories`);
const {loginRouter} = require(`./routes/login`);
const {myRouter} = require(`./routes/my`);
const {registerRouter} = require(`./routes/register`);
const {searchRouter} = require(`./routes/search`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/articles`, articleRouter);
app.use(`/categories`, categoryRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(DEFAULT_PORT);
