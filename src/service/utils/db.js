'use strict';

const addPagination = (limit, offset = 0) => {
  return limit ? {
    limit,
    offset
  } : {};
};

module.exports = {
  addPagination,
};
