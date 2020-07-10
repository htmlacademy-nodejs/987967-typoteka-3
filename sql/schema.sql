DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS passwords CASCADE;
DROP TABLE IF EXISTS avatars CASCADE;
DROP TABLE IF EXISTS pictures CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS posts_categories CASCADE;

CREATE TABLE passwords (
    id bigserial PRIMARY KEY,
    password varchar(50) NOT NULL
);

CREATE TABLE avatars (
    id varchar(250) PRIMARY KEY,
    original_name varchar(100) NOT NULL
);

CREATE TABLE users (
    email varchar(250) PRIMARY KEY,
    avatar_id varchar(250) NOT NULL,
    password_id bigint NOT NULL,
    firstname varchar(250) NOT NULL,
    lastname varchar(250) NOT NULL,

    FOREIGN KEY (avatar_id) REFERENCES avatars (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (password_id) REFERENCES passwords (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE pictures (
    id varchar(250) PRIMARY KEY,
    original_name varchar(100) NOT NULL
);

CREATE TABLE posts (
    id bigserial PRIMARY KEY,
    user_email varchar(250) NOT NULL,
    picture_id varchar(250),
    date date DEFAULT CURRENT_TIMESTAMP(0),
    title varchar(250) NOT NULL,
    announce varchar(250) NOT NULL,
    text varchar(1000),

    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (picture_id) REFERENCES pictures (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE categories (
    id bigserial PRIMARY KEY,
    name varchar(60) NOT NULL UNIQUE
);

CREATE TABLE posts_categories (
    post_id bigserial NOT NULL,
    category_id bigserial NOT NULL,

    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE comments (
    id bigserial PRIMARY KEY,
    user_email varchar(250) NOT NULL,
    post_id bigint NOT NULL,
    date date DEFAULT CURRENT_TIMESTAMP(0),
    text varchar(250),

    FOREIGN KEY (user_email) REFERENCES users (email) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE    
);
