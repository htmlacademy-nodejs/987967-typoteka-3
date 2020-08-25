'use strict';

const getPagination = (page, pageCount, url) => ({
  page,
  prev: page > 1 ? page - 1 : null,
  next: page < pageCount ? page + 1 : null,
  pageHref: url,
  pageCount,
});

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

module.exports = {
  getPagination,
  formatDate,
  formatDateTime,
  parseJoiException,
};
