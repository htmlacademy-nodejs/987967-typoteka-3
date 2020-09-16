'use strict';

const {getHash} = require(`./common`);

const createUserSQL = async ({firstname, lastname, email, avatar, originalAvatar, password}) => `
INSERT INTO avatars (id, original_name)
  VALUES ('${avatar}', '${originalAvatar}');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '${await getHash(password)}');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    '${email}',
    '${avatar}',
    currval('passwords_id_seq'),
    '${firstname}',
    '${lastname}'
    );`;

const createUsersSQL = async (users) => {
  const userSQLs = await Promise.all(users.map((it) => createUserSQL(it)));
  return userSQLs.join(`\n`);
};

const createCategoriesSQL = (categories) => `
INSERT INTO categories (id, name) VALUES 
${categories.map(({name}) => `(DEFAULT, '${name}')`).join(`, `)};`;

const createCommentsSQL = (comments) => {
  if (!comments.length) {
    return ``;
  }

  const values = comments.map(({text, date, user}) => {
    const commentDate = new Date(date);
    return `(
      DEFAULT,
      '${user.email}',
      currval('posts_id_seq'),
      '${commentDate.toISOString()}',
      '${text}'
    )`;
  });

  return `INSERT INTO comments (id, user_email, post_id, date, text) VALUES ${values.join(`, `)};`;
};

const createPostCategorySQL = (postCategories) => {
  const values = postCategories.map(({name}) => `(currval('posts_id_seq'), (SELECT id FROM categories WHERE name = '${name}'))`);

  return `INSERT INTO posts_categories (post_id, category_id) VALUES ${values.join(`, `)};`;
};

const createPostSQL = ({title, date: createdDate, announce, fullText, categories, comments, picture, originalPicture, user}) => {
  const pictureSQL = picture ? `INSERT INTO pictures (id, original_name) VALUES ('${picture}', '${originalPicture}');` : ``;

  const date = new Date(createdDate);
  const postSQL = `
INSERT INTO posts (id, user_email, picture_id, date, title, announce, text)
  VALUES (
    DEFAULT,
    '${user.email}',
    ${picture ? `'${picture}'` : `null`},
    '${date.toISOString()}',
    '${title}',
    '${announce}',
    '${fullText}'
    );`;

  return [pictureSQL, postSQL, createCommentsSQL(comments), createPostCategorySQL(categories)].join(`\n`);
};

const createPostsSQL = (posts) => posts.map((it) => createPostSQL(it)).join(`\n`);

module.exports = {
  createUsersSQL,
  createCategoriesSQL,
  createPostsSQL,
};
