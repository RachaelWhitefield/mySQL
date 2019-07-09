var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 8889,
    database: "bamazon_db"
});

function menu() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        console.table(data);

        inquirer.prompt([
            {
            message: "What is the ID of the product you would like to buy?",
            type: "list",
            name: "productName",
            choices: function () {
                var options = data.map(function(option) {
                    return option.product_name;
                });
                return options;
            }
        },
        {
            message: "How much would you like to purchase?",
            name: "amount",
            validate: function(input) {
                if(isNaN(input)) {
                    return "Please enter a number to purchase";
                }
                return true;
            }
        }
    ]).then(function(answer) {
            console.log(data);
            var selectedItem;
            for(var i = 0; i < data.length; i++){
                if(data[i]["product_name"] === answer.productName){
                    selectedItem = data[i]
                    console.log(selectedItem);
                }
                
            }
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: selectedItem.stock_quantity - parseInt(answer.amount)
            },
            {
                product_name: answer.productName
            }], function(err) {
                if (err) throw err;
                 console.log(`You have purchased ${answer.amount} of ${answer.productName}!`);
            }
            )
        })
    })
}
menu();