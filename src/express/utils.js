'use strict';

const {HttpStatusCode} = require(`./const`);

const getPagination = (page, pageCount, url) => ({
  page,
  prev: page > 1 ? page - 1 : null,
  next: page < pageCount ? page + 1 : null,
  pageHref: url,
  pageCount,
});

const simplify = (object) => {
  const simplifyObject = {};
  Object.keys(object).forEach((it) => {
    if (object[it] !== undefined) {
      simplifyObject[it] = object[it];
    }
  });

  return simplifyObject;
};

const formatNumber = (number) => `${number < 10 ? `0` : ``}${number}`;

const formatDate = (date) => {
  const days = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);

  return `${days}.${month}.${date.getFullYear()}`;
};

const formatDateTime = (date) => {
  const minutes = formatNumber(date.getMinutes());
  const hours = formatNumber(date.getHours());

  return `${formatDate(date)}, ${hours}:${minutes}`;
};

const parseJoiException = (exception) => {
  if (exception) {
    return exception.details.map((it) => it.message);
  }

  return [];
};

const splitJoiException = (exception) => {
  const errors = {};

  exception.details.forEach((it) => {
    const key = it.context.key;
    if (!errors[key]) {
      errors[key] = [];
    }

    errors[key].push(it.message);
  });

  return errors;
};

const extractPicture = (req) => {
  const {originalName, fileName} = req.body;

  const storedPictureData = originalName && fileName ? {
    originalName,
    name: fileName
  } : null;

  const uploadPicture = req.file ? {
    originalName: req.file.originalname,
    name: req.file.filename
  } : null;

  return uploadPicture || storedPictureData;
};

const render = (template, data, req, res, status = HttpStatusCode.OK) => {
  const {user} = req.session || {user: null};
  const url = encodeURIComponent(req.originalUrl);
  const back = decodeURIComponent(req.query.back || `/`);

  res.status(status).render(template, {
    ...data,
    user,
    url,
    back,
  });
};

const customEventName = (eventName, postId) => `${eventName}-${postId}`;

const reduceText = (text, length) => text.length > length ? `${text.slice(0, length)}...` : text;

const getJoiStringErrors = (name, range, empty = true) => {
  const minMessage = range.MIN !== undefined ? {
    [`string.min`]: `Длина ${name} должна быть не менее ${range.MIN} символов`
  } : {};

  const maxMessage = range.MAX !== undefined ? {
    [`string.max`]: `Длина ${name} должна быть не более ${range.MAX} символов`
  } : {};

  const requireMessage = empty ? {
    [`string.empty`]: `Поле ${name} является обязательным`
  } : {};

  return {
    ...minMessage,
    ...maxMessage,
    ...requireMessage,
  };
};

module.exports = {
  getPagination,
  formatDate,
  formatDateTime,
  parseJoiException,
  splitJoiException,
  simplify,
  extractPicture,
  render,
  customEventName,
  reduceText,
  getJoiStringErrors,
};
