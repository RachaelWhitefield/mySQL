var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "bamazon_db"
});

function menu() {
    

        inquirer.prompt([
            {
            message: "What would you like to do, Manager?",
            type: "list",
            name: "action",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
                // answers.action
            }
        ]).then(function(answer) {
            console.log(answer.action);
            if (answer.action === "View Products for Sale") {
                showTable();
            } else if (answer.action === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.action === "Add to Inventory") {
                addToInventory();
            } else if (answer.action === "Add New Product") {
                addNewProduct();
            }
        });
    
}
menu();


function showTable() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        console.table(data);
})
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, data) {
        if (err) throw err;
        console.table(data);
    })
}

function addToInventory() {
    // ask what item to add and how much
    connection.query("SELECT * FROM products", function(err, data) {
        inquirer.prompt([
            {
                message: "What is the name of the item you would like to add?",
                type: "list",
                name: "productName",
                choices: function() {
                    var options = data.map(function(option) {
                        return option.product_name;
                    });
                    return options;
                }
            },
            {
                message: "How much of the item you would like to add?",
                name: "amount",
                validate: function(input) {
                    if(isNaN(input)) {
                        return "Please enter a number to purchase";
                    }
                    return true;
                }
            }
        ]).then(function(answer) {
            var selectedItem;
            for(var i = 0; i < data.length; i++){
                if(data[i]["product_name"] === answer.productName){
                    selectedItem = data[i]
                }
            }

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: selectedItem.stock_quantity + parseInt(answer.amount)
                },
                {
                    product_name: answer.productName
                }], function(err) {
                    if (err) throw err;
                    console.log(`You have added ${answer.amount} of ${answer.productName}!`);
                    console.log(`You now have ${selectedItem.stock_quantity + parseInt(answer.amount)} of ${answer.productName}`);
                    
                }
            )
            
        })
    })

}

function addNewProduct() {
    // what is the name of the product you would like to add?
    // ask for department, price, and quantity (inquierer questions)
    connection.query("SELECT * FROM products", function (err,data) {
        inquirer.prompt([
            {
                message: "What is the name of the product you would like to add?",
                type: "input",
                name: "productName",
            },
            {
                message: "What is the department your product belongs in?",
                type: "input",
                name: "departmentName",
            },
            {
                message: "What is the price of your product?",
                type: "input",
                name: "productPrice",
            },
            {
                message: "What is the quantity of your product?",
                type: "input",
                name: "quantity"
            }
        ]).then(function(answers) {
            connection.query(
                "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
                [answers.productName, answers.departmentName, answers.productPrice, answers.quantity],
                function(err) {
                    if (err) throw err;
                    console.log(`New product ${answers.productName} successfully added!`);
                }
            )
        })
    })

}