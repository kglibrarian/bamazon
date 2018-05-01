DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
 id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NULL,
 department_name VARCHAR(45) NULL,
 price DECIMAL(10,2) NULL,
 stock_quantity INTEGER NULL,
 PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('camera', 'electronics', 100, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'electronics', 1200, 50);
