SET
  client_encoding = 'UTF8';

CREATE TABLE public.avatars (
  id bigint NOT NULL,
  user_id bigint NOT NULL,
  name character varying(200) NOT NULL,
  "originalName" character varying(200) NOT NULL
);

ALTER TABLE
  public.avatars OWNER TO typoteka;

CREATE SEQUENCE public.avatars_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.avatars_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.avatars_id_seq OWNED BY public.avatars.id;

CREATE TABLE public.categories (
  id bigint NOT NULL,
  name character varying(30) NOT NULL
);

ALTER TABLE
  public.categories OWNER TO typoteka;

CREATE SEQUENCE public.categories_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.categories_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;

CREATE TABLE public.comments (
  id bigint NOT NULL,
  user_id bigint NOT NULL,
  post_id bigint NOT NULL,
  date timestamp with time zone NOT NULL,
  text character varying(500) NOT NULL
);

ALTER TABLE
  public.comments OWNER TO typoteka;

CREATE SEQUENCE public.comments_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.comments_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;

CREATE TABLE public.passwords (
  id bigint NOT NULL,
  password character varying(60) NOT NULL,
  user_id bigint NOT NULL
);

ALTER TABLE
  public.passwords OWNER TO typoteka;

CREATE SEQUENCE public.passwords_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.passwords_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.passwords_id_seq OWNED BY public.passwords.id;

CREATE TABLE public.pictures (
  id bigint NOT NULL,
  name character varying(200) NOT NULL,
  "originalName" character varying(200) NOT NULL,
  post_id bigint NOT NULL
);

ALTER TABLE
  public.pictures OWNER TO typoteka;

CREATE SEQUENCE public.pictures_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.pictures_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.pictures_id_seq OWNED BY public.pictures.id;

CREATE TABLE public.posts (
  id bigint NOT NULL,
  date timestamp with time zone NOT NULL,
  title character varying(250) NOT NULL,
  announce character varying(250) NOT NULL,
  text character varying(1000)
);

ALTER TABLE
  public.posts OWNER TO typoteka;

CREATE TABLE public.posts_categories (
  post_id bigint NOT NULL,
  category_id bigint NOT NULL
);

ALTER TABLE
  public.posts_categories OWNER TO typoteka;

CREATE SEQUENCE public.posts_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.posts_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;

CREATE TABLE public.users (
  id bigint NOT NULL,
  email character varying(250) NOT NULL,
  firstname character varying(50) NOT NULL,
  lastname character varying(50) NOT NULL
);

ALTER TABLE
  public.users OWNER TO typoteka;

CREATE SEQUENCE public.users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  public.users_id_seq OWNER TO typoteka;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE
  ONLY public.avatars
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.avatars_id_seq' :: regclass);

ALTER TABLE
  ONLY public.categories
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.categories_id_seq' :: regclass);

ALTER TABLE
  ONLY public.comments
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.comments_id_seq' :: regclass);

ALTER TABLE
  ONLY public.passwords
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.passwords_id_seq' :: regclass);

ALTER TABLE
  ONLY public.pictures
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.pictures_id_seq' :: regclass);

ALTER TABLE
  ONLY public.posts
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.posts_id_seq' :: regclass);

ALTER TABLE
  ONLY public.users
ALTER COLUMN
  id
SET
  DEFAULT nextval('public.users_id_seq' :: regclass);

ALTER TABLE
  ONLY public.avatars
ADD
  CONSTRAINT avatars_name_key UNIQUE (name);

ALTER TABLE
  ONLY public.avatars
ADD
  CONSTRAINT avatars_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.avatars
ADD
  CONSTRAINT avatars_user_id_key UNIQUE (user_id);

ALTER TABLE
  ONLY public.categories
ADD
  CONSTRAINT categories_name_key UNIQUE (name);

ALTER TABLE
  ONLY public.categories
ADD
  CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.comments
ADD
  CONSTRAINT comments_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.passwords
ADD
  CONSTRAINT passwords_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.pictures
ADD
  CONSTRAINT pictures_name_key UNIQUE (name);

ALTER TABLE
  ONLY public.pictures
ADD
  CONSTRAINT pictures_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.pictures
ADD
  CONSTRAINT pictures_post_id_key UNIQUE (post_id);

ALTER TABLE
  ONLY public.posts_categories
ADD
  CONSTRAINT posts_categories_pkey PRIMARY KEY (post_id, category_id);

ALTER TABLE
  ONLY public.posts
ADD
  CONSTRAINT posts_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.users
ADD
  CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE
  ONLY public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE
  ONLY public.avatars
ADD
  CONSTRAINT avatars_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.comments
ADD
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.comments
ADD
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.passwords
ADD
  CONSTRAINT passwords_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.pictures
ADD
  CONSTRAINT pictures_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.posts_categories
ADD
  CONSTRAINT posts_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE
  ONLY public.posts_categories
ADD
  CONSTRAINT posts_categories_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
