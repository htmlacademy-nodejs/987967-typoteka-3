'use strict';

const {formatDateTime, formatDate} = require(`../utils`);

const CATEGORY_ID_PREFIX = `category-id-`;

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
      dateTimeLocalized: formatDateTime(date),
      comments: rawPost.comments && rawPost.comments.map((it) => this.getComment(it))
    };
  }
};

const ExpressToServiceAdapter = {
  getPost(postData) {
    const categories = Object.keys(postData).reduce((acc, cur) => {
      const matches = cur.match(RegExp(`${CATEGORY_ID_PREFIX}(.+)`));
      return matches ? [...acc, matches[1]] : acc;
    }, []).map((it) => ({id: it}));

    const [date, month, year] = postData.date.split(`.`).map((it) => parseInt(it, 10));
    const createdDate = (new Date(year, month - 1, date)).valueOf();

    return {
      ...postData,
      categories,
      createdDate,
    };
  }
};

module.exports = {
  ServiceToExpressAdapter,
  ExpressToServiceAdapter,
};
