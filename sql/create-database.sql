DROP DATABASE IF EXISTS typoteka;
DROP USER IF EXISTS typoteka;

CREATE ROLE typoteka WITH
    LOGIN
    PASSWORD '123';

CREATE DATABASE typoteka
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE template0
    CONNECTION LIMIT = -1;

ALTER DATABASE typoteka OWNER TO typoteka;
