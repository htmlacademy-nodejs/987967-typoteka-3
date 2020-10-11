'use strict';

const CategorySortType = {
  BY_NAME: `name`,
  BY_POST_COUNT: `count`,
};

const PostSortType = {
  BY_DATE: `date`,
  BY_POPULARITY: `popularity`,
};

const DBEvent = {
  CHANGE_POST_COMMENTS: `change_post_comments`,
  CHANGE_POPULAR_POSTS: `change_popular_posts`,
};

module.exports = {
  CategorySortType,
  PostSortType,
  DBEvent,
};
