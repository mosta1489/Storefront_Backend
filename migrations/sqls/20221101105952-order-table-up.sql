CREATE TABLE orders (
    id VARCHAR(150) PRIMARY KEY,
    user_id VARCHAR(150),
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
