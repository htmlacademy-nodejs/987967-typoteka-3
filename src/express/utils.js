'use strict';

const getPagination = (page, pageCount, url) => ({
  page,
  prev: page > 1 ? page - 1 : null,
  next: page < pageCount ? page + 1 : null,
  pageHref: url,
  pageCount,
});

module.exports = {
  getPagination,
};
