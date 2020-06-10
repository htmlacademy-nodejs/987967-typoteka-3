'use strict';

module.exports = {
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1,
    WORKING: 2,
  },

  DURATION: 1000 * 60 * 60 * 24 * 90,
  MIN_SENTENCES_COUNT: 5,
  MAX_SENTENCES_COUNT: 50,
  MIN_COMMENT_COUNT: 0,
  MAX_COMMENT_COUNT: 5,
  ANNOUNCE_SENTENCES_COUNT: 5,
  MOCK_FILE: `mocks.json`,
  ID_LENGTH: 6,
};
