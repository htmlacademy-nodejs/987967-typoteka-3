'use strict';

const {getHash} = require(`./common`);

const createUserSQL = async ({firstname, lastname, email, avatar, originalAvatar, password}) => `
INSERT INTO users (id, email, firstname, lastname)
  VALUES (
    DEFAULT,
    '${email}',
    '${firstname}',
    '${lastname}'
    );

INSERT INTO avatars (id, name, "originalName", user_id)
  VALUES (
    DEFAULT, 
    '${avatar}', 
    '${originalAvatar}',
    currval('users_id_seq')
  );
    
  INSERT INTO passwords (id, password, user_id)
  VALUES (
    DEFAULT,
    '${await getHash(password)}',
    currval('users_id_seq')
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
      (SELECT id FROM users WHERE email = '${user.email}'),
      currval('posts_id_seq'),
      '${commentDate.toISOString()}',
      '${text}'
    )`;
  });

  return `INSERT INTO comments (id, user_id, post_id, date, text) VALUES ${values.join(`, `)};`;
};

const createPostCategorySQL = (postCategories) => {
  const values = postCategories.map(({name}) => `(currval('posts_id_seq'), (SELECT id FROM categories WHERE name = '${name}'))`);

  return `INSERT INTO posts_categories (post_id, category_id) VALUES ${values.join(`, `)};`;
};

const createPostSQL = ({title, date: createdDate, announce, text, categories, comments, picture, originalPicture}) => {
  const pictureSQL = picture
    ? `INSERT INTO pictures (id, name, "originalName", post_id) VALUES (DEFAULT, '${picture}', '${originalPicture}', currval('posts_id_seq'));` : ``;

  const date = new Date(createdDate);
  const postSQL = `
INSERT INTO posts (id, date, title, announce, text)
  VALUES (
    DEFAULT,
    '${date.toISOString()}',
    '${title}',
    '${announce}',
    '${text}'
    );`;

  return [postSQL, pictureSQL, createCommentsSQL(comments), createPostCategorySQL(categories)].join(`\n`);
};

const createPostsSQL = (posts) => posts.map((it) => createPostSQL(it)).join(`\n`);

module.exports = {
  createUsersSQL,
  createCategoriesSQL,
  createPostsSQL,
};
