'use strict';

const MainConst = require(`../const`);

module.exports = {
  ...MainConst,

  DEFAULT_PORT: 8080,
  DATA_SERVER_PORT: 3000,
  TIMEOUT: 3000,
  POST_PREVIEW_COUNT: 8,
  POPULAR_POST_COUNT: 4,
  LASTST_COMMENT_COUNT: 4,
  ANNOUNCE_PREVIEW_LENGTH: 100,
  COMMENT_PREVIEW_LENGTH: 100,
  NEW_POST_TITLE: `Новая публикация`,
  EDIT_POST_TITLE: `Редактирование публикации`,

  PostSortType: {
    POPULARITY: `popularity`,
    DATE: `date`,
  },

  ErrorType: {
    BAD_DB_REQUEST: `Bad DB request`,
  },

  UserFormType: {
    REGISTER: `register`,
    LOGIN: `login`,
  },

  UserRole: {
    ADMIN: `admin`,
    READER: `reader`,
  },

};
