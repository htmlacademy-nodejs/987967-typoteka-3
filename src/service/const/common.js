'use strict';

const MAX_POSTS_COUNT = 1000;
const MAX_USER_COUNT = 10;

module.exports = {
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1,
    WORKING: 2,
  },

  DURATION: 1000 * 60 * 60 * 24 * 90,

  SentenceCount: {
    MIN: 5,
    MAX: 50
  },

  CommentCount: {
    MIN: 0,
    MAX: 5
  },

  CategoryCount: {
    MIN: 1,
    MAX: 3
  },

  ANNOUNCE_SENTENCES_COUNT: 5,

  MOCK_FILE: `data/mocks.json`,
  SQL_FILE: `sql/mocks.sql`,
  ID_LENGTH: 6,
  DEFAULT_PORT: 3000,

  HttpStatusInfo: {
    NOT_FOUND: `Not found`,
    SERVER_ERROR: `Server error`,
    BAD_REQUEST: `Bad request`,
  },

  ANNOUNCE_LENGTH: 400,

  TIMEOUT: 3000,

  DEFAULT_POSTS_COUNT: 1,
  DEFAULT_USER_COUNT: 1,

  MAX_POSTS_COUNT,
  MAX_USER_COUNT,

  Message: {
    WRONG_POSTS_COUNT: `No more than ${MAX_POSTS_COUNT} articles`,
    WRONG_USER_COUNT: `No more than ${MAX_USER_COUNT} articles`,
    FILE_ERROR: `Can't write data to file...`,
    FILE_SUCCESS: `Operation success. File was created.`,
    DB_ERROR: `Can't create the mock database...`,
    DB_SUCCESS: `Operation success. The mock database was created.`,
  },

  DataFileName: {
    TITLE: `titles.txt`,
    DESCRIPTION: `sentences.txt`,
    CATEGORY: `categories.txt`,
    COMMENT: `comments.txt`,
    NAME: `names.txt`,
  },

  AVATAR_MOCK_FOLDER: `data/avatars`,
  PICTURE_MOCK_FOLDER: `data/post-images`,
  AVATAR_FOLDER: `src/express/public/img/avatars`,
  PICTURE_FOLDER: `src/express/public/img/post-images`,

  BAD_REQUEST_EXCEPTION: `Bad request exception`,

  BCRYPT_SALT: 10,

  UserRole: {
    ADMIN: `admin`,
    READER: `reader`,
    UNAUTHORIZED: `unauthorized`,
  },

  AppEvent: {
    CHANGE_POST_COMMENTS: `change_post_comments`,
    CHANGE_POPULAR_POSTS: `change_popular_posts`,
  },
};
