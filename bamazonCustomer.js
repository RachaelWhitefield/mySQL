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
    inquirer.prompt({
        message: "What is the ID of the product you would like to buy?",
        type: "list",
        name: "action",
        choices: []
    })
}