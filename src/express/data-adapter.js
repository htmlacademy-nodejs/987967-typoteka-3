'use strict';

const {formatDateTime, formatDate} = require(`../utils`);

const ServiceToExpressAdapter = {
  getComment(rawComment) {
    const date = new Date(rawComment.date);

    return {
      ...rawComment,
      dateTime: date.toISOString(),
      dateTimeLocalized: formatDateTime(date),
    };
  },

  getPostPreview(rawPost) {
    const date = new Date(rawPost.createdDate);

    return {
      ...rawPost,
      dateTime: date.toISOString(),
      dateTimeLocalized: formatDateTime(date),
    };
  },

  getPost(rawPost) {
    const date = new Date(rawPost.createdDate);

    return {
      ...rawPost,
      dateTime: date.toISOString(),
      dateLocalized: formatDate(date),
    };
  }
};

module.exports = {
  ServiceToExpressAdapter
};
