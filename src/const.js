'use strict';

module.exports = {
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

  FileNameLength: {
    MIN: 3,
    MAX: 200,
  },

  UserNameLength: {
    MIN: 2,
    MAX: 50,
  },

  CommentLength: {
    MIN: 20,
    MAX: 500,
  },

  PasswordLength: {
    MIN: 6,
    MAX: 200,
  },

  PasswordHashLength: {
    MAX: 60,
  },

  EmailLength: {
    MAX: 250,
  },

  HttpStatusCode: {
    OK: 200,
    CREATE: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },

  POPULAR_POST_COUNT: 4,
  RECENT_COMMENT_COUNT: 4,
};
