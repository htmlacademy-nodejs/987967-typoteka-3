'use strict';

const {formatNumber} = require(`../utils`);

const ServiceToExpressAdapter = {
  getPostPreview(rawPost) {
    const date = new Date(rawPost.createdDate);
    const days = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1);
    const minutes = formatNumber(date.getMinutes());
    const hours = formatNumber(date.getHours());

    return {
      ...rawPost,
      dateTime: date.toISOString(),
      dateTimeLocalized: `${days}.${month}.${date.getFullYear()}, ${hours}:${minutes}`,
    };
  }
};

module.exports = {
  ServiceToExpressAdapter
};
