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
      comments: rawPost.comments && rawPost.comments.map((it) => this.getComment(it))
    };
  }
};

const ExpressToServiceAdapter = {
  getPost(postData) {
    const regexp = RegExp(`${CATEGORY_ID_PREFIX}(.+)`);

    const categoryIds = Object.keys(postData).reduce((acc, cur) => {
      const matches = cur.match(regexp);
      return matches ? [...acc, matches[1]] : acc;
    }, []);

    const categories = categoryIds.map((it) => ({id: it}));

    const date = (new Date(postData.date)).toISOString();

    return {
      ...postData,
      categoryIds,
      categories,
      date,
    };
  }
};

module.exports = {
  ServiceToExpressAdapter,
  ExpressToServiceAdapter,
};
