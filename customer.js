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
  loadProducts();
});

function loadProducts(){
  let query = 'SELECT * FROM products'; 
  connection.query(query, function(err, res) {
    console.table(res);

    // prompt customer for product
    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory){
    // console.log(inventory);
    inquirer.prompt([
      {
        name: 'choice',
        type: 'input',
        message: 'Enter the ID of the item you would like to buy'
      }
    ]).then(function(val){
      console.log(val);
      let choiceId= parseInt(val.choice);
      console.log("This is my choiceId " + choiceId);
      //query products to see if have enough
      let product = checkInventory(choiceId, inventory);
      // console.log("This is the product you selected " + product);
      if (product) {
        promptCustomerForQuantity(product);
      } else {
        console.log("That item is not in our inventory.");
        loadProducts();
      }
    });
}; 

function promptCustomerForQuantity(product) {
  inquirer.prompt([
    {
      name: 'quantity',
      type: 'input',
      message: 'How many of the items would you like to purchase?'
    }
  ]).then(function(val){
    let quantity = parseInt(val.quantity);
    if (quantity > product.stock_quantity) {
      console.log('not enough');
      loadProducts();
    } else {
      makePurchase(product, quantity);
    }
  })
}

function makePurchase(product, quantity) {
  console.log("This is my chosen quantity " + quantity);
  console.log(product);
  console.log(product.item_id);
  connection.query(
  //update database
  'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
  [quantity, product.item_id],
  function(err, res) {
    console.log("Success");
    console.table(product);
    loadProducts();

  } 
)
}

function checkInventory(choiceId, inventory){
  for (var i = 0; i <inventory.length; i++) {
    if (inventory[i].item_id === choiceId){
      console.log("This is inventory[i] " + inventory[i].item_id, inventory[i].product_name, inventory[i].department_name, inventory[i].price, inventory[i].stock_quantity );
      return inventory[i];
      
    }
  }
  return null;
}


