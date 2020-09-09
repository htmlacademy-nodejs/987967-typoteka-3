'use strict';

module.exports = {
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

  CategoryLength: {
    MIN: 5,
    MAX: 30,
  },

  TitleLength: {
    MIN: 30,
    MAX: 250,
  },

  AnnounceLength: {
    MIN: 30,
    MAX: 250,
  },

  TextLength: {
    MIN: 0,
    MAX: 1000,
  },

  UserNameLength: {
    MIN: 2,
    MAX: 50,
  },

  ErrorType: {
    BAD_DB_REQUEST: `Bad DB request`,
  },

  UserFormType: {
    REGISTER: `register`,
    LOGIN: `login`,
  }
};
