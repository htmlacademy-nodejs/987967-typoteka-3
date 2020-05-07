'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`);
const { ExitCode, MOCK_FILE } = require(`../../const`);

const DEFAULT_PORT = 3000;
const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
}

const sendResponse = (status, message, res) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>987967-typoteka-3</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = status;
  res.writeHead(status, {
    "content-type": `text/html; charset=utf-8`
  });
  res.end(template);
}

const onConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const posts = JSON.parse(await fs.promises.readFile(`./${MOCK_FILE}`));
        const titles = posts.map(it => it.title);
        const message = `<ul>${titles.map(it => `<li>${it}</li>`).join(`\n`)}</ul>`
        sendResponse(HttpStatusCode.OK, message, res)
      } catch (err) {
        sendResponse(HttpStatusCode.NOT_FOUND, http.STATUS_CODES[HttpStatusCode.NOT_FOUND], res)
      }
      break;
    
    default: sendResponse(HttpStatusCode.NOT_FOUND, http.STATUS_CODES[HttpStatusCode.NOT_FOUND], res)
  }
}

module.exports = {
  name: `--server`,
  run(arg) {
    const [customPort] = arg;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(chalk.red(`Server creation error: ${err}`));
          process.exit(ExitCode.ERROR)
        };

        console.info(chalk.green(`Listening port ${port}...`));
      });
    
    return ExitCode.WORKING
  }
};
