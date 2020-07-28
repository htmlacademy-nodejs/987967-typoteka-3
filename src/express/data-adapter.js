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
      comments: rawPost.comments && rawPost.comments.map((it) => this.getComment(it)),
    };
  }
};

const ExpressToServiceAdapter = {
  getPost(postData) {
    const regexp = RegExp(`${CATEGORY_ID_PREFIX}(.+)`);

    const categories = Object.keys(postData).reduce((acc, cur) => {
      const matches = cur.match(regexp);
      return matches ? [...acc, {id: matches[1]}] : acc;
    }, []);

    const [day, month, year, hour, minute] = postData.date.replace(/[, :]+/g, `.`).split(`.`).map((it) => Number(it));
    const date = new Date(year, month - 1, day, hour, minute).toISOString();

    return {
      ...postData,
      categories,
      date,
    };
  }
};

module.exports = {
  ServiceToExpressAdapter,
  ExpressToServiceAdapter,
};
