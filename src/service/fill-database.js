'use strict';

const createUser = ({firstname, lastname, email, avatar, originalAvatar, password}) => `
INSERT INTO avatars (id, original_name)
  VALUES ('${avatar}', '${originalAvatar}');

INSERT INTO passwords (id, password)
  VALUES (DEFAULT, '${password}');

INSERT INTO users (email, avatar_id, password_id, firstname, lastname)
  VALUES (
    '${email}',
    '${avatar}',
    currval('passwords_id_seq'),
    '${firstname}',
    '${lastname}'
    );`;

const createUsers = (users) => users.map((it) => createUser(it)).join(`\n`);

const createCategories = (categories) => `
INSERT INTO categories (id, name) VALUES 
${categories.map(({name}) => `(DEFAULT, '${name}')`).join(`, `)};`;

const createComments = (comments) => {
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

const createPostCategory = (postCategories) => {
  const values = postCategories.map(({name}) => `(currval('posts_id_seq'), (SELECT id FROM categories WHERE name = '${name}'))`);

  return `INSERT INTO posts_categories (post_id, category_id) VALUES ${values.join(`, `)};`;
};

const createPost = ({title, createdDate, announce, fullText, categories, comments, picture, originalPicture, user}) => {
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

  return [pictureSQL, postSQL, createComments(comments), createPostCategory(categories)].join(`\n`);
};

const createPosts = (posts) => posts.map((it) => createPost(it)).join(`\n`);

module.exports = {
  createUsers,
  createCategories,
  createPosts,
};
