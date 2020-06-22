'use strict';

const {formatDate} = require(`../utils`);

const ServiceToExpressAdapter = {
  getComment(rawComment) {
    const date = new Date(rawComment.date);

    return {
      ...rawComment,
      dateTime: date.toISOString(),
      dateTimeLocalized: formatDate(date),
    };
  },

  getPostPreview(rawPost) {
    const date = new Date(rawPost.createdDate);

    return {
      ...rawPost,
      dateTime: date.toISOString(),
      dateTimeLocalized: formatDate(date),
    };
  }
};

module.exports = {
  ServiceToExpressAdapter
};
