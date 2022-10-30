CREATE TABLE users (
    id VARCHAR(150) PRIMARY KEY,
    username VARCHAR(150) UNIQUE,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    isadmin BOOLEAN DEFAULT 'f',
    password VARCHAR(150)
);

CREATE TABLE products (
    id VARCHAR(150) PRIMARY KEY,
    name VARCHAR(150),
    price integer
);


CREATE TABLE orders (
    id VARCHAR(150) PRIMARY KEY,
    product_id VARCHAR(150),
    user_id VARCHAR(150),
    quantity integer,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);