'use strict';

const MainConst = require(`../const`);

module.exports = {
  ...MainConst,

  TIMEOUT: 3000,
  POST_PREVIEW_COUNT: 8,
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

  LoggerName: {
    APP: `front:app`,
    AXIOS: `front:axios`,
  },

  AppEvent: {
    CHANGE_RECENT_COMMENTS: `change_recent_comments`,
    CHANGE_POPULAR_POSTS: `change_popular_posts`,
    CHANGE_POST_COMMENTS: `change_post_comments`,
  },

  ServerEvent: {
    CHANGE_POPULAR_POSTS: `change_popular_posts`,
    CHANGE_POST_COMMENTS: `change_post_comments`,
  },

  Session: {
    NAME: `session_id`,
    EXPIRATION: 24 * 60 * 60 * 1000,
    CHECK_INTERVAL: 10 * 60 * 1000,
  }
};
