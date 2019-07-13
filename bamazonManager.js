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
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

        console.table(data);

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
    })
}
menu();


function showTable() {

}

function viewLowInventory() {

}

function addToInventory() {

}

function addNewProduct() {

}