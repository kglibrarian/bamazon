### bamazon

## About
Bamazon is an Amazon.com-like storefront. The app takes in orders from customers and deplete stock from the store's inventory which is stored in an SQL database. 

## Note

Make sure you use node's npm init function to download any dependencies. This app uses inquirer, mysql, and console.table

## Instructions

### Download MySQL workbench. 
Remember to write down your username and password. If you don't remember, go to Server --> Users and Privileges. You will need to enter these into the customer.js file. 

### Create the database: bamazon_db in MySQL Workbench
1. In MySQL workbench click on the + button to create a new MySQL tab for executing queries. 
2. In a text editor (i.e. Visual Studio) open the Schema.sql file. Copy and paste the code into MySQL Workbench tab. Click on the lightning bolt to run the code. 

![MySQL Workbench](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon7.PNG)

3. In a text editor (i.e. Visual Studio) open the seeds.sql file. Copy and paste the code into MySQL Workbench tab. Click on the lightning bolt to run the code. 

![MySQL Workbench](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon8.PNG)

#### You should now have a completed database called bamazon_db

![MySQL Workbench](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon9.PNG)

### Open the JavaScript file in TextEditor and Use the Command Line
#Make sure you use node's npm init function to download any dependencies. This app uses inquirer, mysql, and console.table.

1. Open the bamazon files in a text editor, such as Visual Studio

![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon1.PNG)

2. Right click on the customer.js file and select "Open in Command Prompt"

![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon2.2.png)

3. In the Command Prompt, type in node customer.js

![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon3.PNG)

4. You will see a table of the items available in the bamazon_db database. Enter the ID of the item you would like to purchase. 
![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon4.PNG)

5. If the item ID you entered is available in the database, then follow the prompt and enter the quantity of items you would like to purchase. You will receive the message "success" if you were able to purchase the item. 

![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon5.PNG)

6. If the item ID you entered is not available in the database, you will receive a message stating the item is not in stock. You will then be prompted to enter another item ID. 

![Visual Studio](https://raw.githubusercontent.com/kglibrarian/bamazon/master/images/bamazon6.PNG)




