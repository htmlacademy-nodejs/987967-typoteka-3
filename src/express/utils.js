'use strict';

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


module.exports = {
  getPagination,
  formatDate,
  formatDateTime,
  parseJoiException,
  splitJoiException,
  simplify,
};
