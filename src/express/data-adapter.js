'use strict';

const {formatDateTime, formatDate} = require(`./utils`);

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
    const date = new Date(rawPost.date);

    return {
      ...rawPost,
      dateTime: date,
      dateTimeLocalized: formatDateTime(date),
    };
  },

  getPost(rawPost) {
    const date = new Date(rawPost.date);

    return {
      ...rawPost,
      dateTime: date,
      dateLocalized: formatDate(date),
      dateTimeLocalized: formatDateTime(date),
      comments: rawPost.comments && rawPost.comments.map((it) => this.getComment(it)),
    };
  }
};

module.exports = {
  ServiceToExpressAdapter,
};
