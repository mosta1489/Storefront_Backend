CREATE TABLE order_products (
    order_id VARCHAR(150),
    product_id VARCHAR(150),
    quantity integer,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE SET NULL
);
