var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "Karen",
  password: "test827",
  database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) {
      console.error('error connecting: ' + error.stack);
  }
  // run the start function after the connection is made to prompt the user
  console.log("The connection thread is " + connection.threadId);
  console.log("The connection has loaded properly.");
  promptManager();
});

function promptManager(){
    inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
      ]).then(function(val){
        console.log(val);
        if (val.action == "View Products for Sale") {
            console.log("View Products");
            loadProducts();
        }
        if (val.action == "View Low Inventory") {
            console.log("View Low Inventory");
            viewLow();
        }
        if(val.action == "Add to Inventory") {
            console.log("Adding to Inventory");
            stepAddInventory();
        }
        if(val.action == "Add New Product") {
            console.log("Adding a new product");
            stepAddProduct();
        }
  })
}

  function loadProducts(){
    let query = 'SELECT * FROM products'; 
    connection.query(query, function(err, res) {
      console.table(res);
      promptManager();
    });
  }

    function viewLow(){
        console.log("I'm running viewLow");
        let query = 'SELECT * FROM products WHERE stock_quantity < 5';
        connection.query(query, function(err, res) {
            console.table(res);
            promptManager();
        });
    }

function stepAddInventory() {
    let query = 'SELECT * FROM products'; 
    connection.query(query, function(err, res) {
        console.table(res);
        promptManagerForItem(res);
       
    });
}

function promptManagerForItem(inventory){
    // console.log(inventory);
    inquirer.prompt([
      {
        name: 'choice',
        type: 'input',
        message: 'Enter the ID of the item you would like to add to'
      }
    ]).then(function(val){
      console.log(val);
      let choiceId= parseInt(val.choice);
      console.log("This is my choiceId " + choiceId);
      //query products to see if have enough
      let product = checkInventory(choiceId, inventory);
      // console.log("This is the product you selected " + product);
      if (product) {
        promptManagerForQuantity(product);
      } else {
        console.log("That item is not in our inventory.");
        loadProducts();
      }
    });
}; 

function checkInventory(choiceId, inventory){
    for (var i = 0; i <inventory.length; i++) {
      if (inventory[i].item_id === choiceId){
        console.log("This is inventory[i] " + inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, inventory[i].price, inventory[i].stock_quantity );
        return inventory[i];
        
      }
    }
    return null;
  }

  function promptManagerForQuantity(product) {
    inquirer.prompt([
      {
        name: 'quantity',
        type: 'input',
        message: 'How many of the items would you like to add?'
      }
    ]).then(function(val){
      let quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log('not enough');
        loadProducts();
      } else {
        addInventory(product, quantity);
      }
    })
  }

  function addInventory(product, quantity) {
    console.log("This is my chosen quantity " + quantity);
    console.log(product);
    console.log(product.item_id);
    connection.query(
    //update database
    'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
    [quantity, product.item_id],
    function(err, res) {
      console.log("Success");
      console.table(product);
      loadProducts();
  
    } 
  )
  }

  function stepAddProduct() {
    inquirer.prompt([
        {
          name: 'product_name',
          type: 'input',
          message: 'What is name of the product you would like to add?'
        },
        {
            name: 'department_name',
            type: 'input',
            message: 'What is name of the department for this product?'
        },
        {
            name: 'price',
            type: 'input',
            message: 'What is the price for this product?'
        },
        {
            name: 'stock_quantity',
            type: 'input',
            message: 'What is the stock quantity for this product?'
        }
      ]).then(function(val){
          console.log(val);
          var post  = val;
          var query = connection.query('INSERT INTO products SET ?', post, function (error, results, fields) {
            if (error) throw error;
            // Neat!
          });
          console.log(query.sql);
          loadProducts();

      })
  };