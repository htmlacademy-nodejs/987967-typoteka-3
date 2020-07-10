DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id bigserial PRIMARY KEY,
    text varchar(50) NOT NULL
);

INSERT INTO test VALUES (DEFAULT, 'Фыва');
SELECT * FROM test;
