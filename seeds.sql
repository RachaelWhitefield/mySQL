DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL (5,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Personal Care", 9.00, 7),
("Conditioner", "Personal Care", 10.00, 6),
("Coffee Pods", "Kitchen", 12.00, 10),
("Bottled Water", "Kitchen", 2.00, 12),
("Pens", "School", 1.00, 8),
("Pencils", "School", 1.00, 10),
("Dog Food", "Pets", 20.00, 5),
("Cat Food", "Pets", 17.00, 4),
("Beer", "Party", 22.00, 3),
("Wine", "Party", 15.00, 9);

SELECT * FROM products;





-- Shampoo         Personal Care   9.00    7
-- Conditioner     Personal Care   10.00   6
-- Coffee Pods     Kitchen         12.00   10
-- Bottled Water   Kitchen         2.00    12
-- Pens            School          1.00    8
-- Pencils         School          1.00    10
-- Dog Food        Pets            20.00   5
-- Cat Food        Pets            17.00   4
-- Beer            Party           22.00   3
-- Wine            Party           15.00   9