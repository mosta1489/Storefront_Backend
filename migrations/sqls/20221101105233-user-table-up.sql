CREATE TABLE users (
    id VARCHAR(150) PRIMARY KEY,
    username VARCHAR(150) UNIQUE,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    isadmin BOOLEAN DEFAULT 'f',
    password VARCHAR(150)
);