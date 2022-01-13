DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(100) NOT NULL,
    author varchar(100) NOT NULL,
    body varchar(200) int NOT NULL,
    post_id int
);

