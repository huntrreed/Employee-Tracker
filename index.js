const inquirer = require('inquirer');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
    );
/*display main menu when first connecting to inquirer*/
    displayMainMenu();

/* Main Menu Function*/
function displayMainMenu() {
  console.log('EMPLOYEE MANAGER APP')

  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit'
  ]
}
/*function calls based on whatever is selected from the main menu*/
]).then((answers) => {
switch(answers.action) {
  case 'View All Employees':
    viewAllEmployees();
    break;
  case 'Add Employee':
    addEmployee();
    break;
  case 'Update Employee Role':
    updateEmployeeRole();
    break;
  case 'View All Roles':
    viewAllRoles();
    break;
  case 'Add Role':
    addRole();
    break;
  case 'View All Departments':
    viewAllDepartments();
    break;
  case 'Add Department':
    addDepartment();
    break;
  case 'Exit':
    db.end();
    console.log('Exiting Employee Manager.');
    break;

}}).catch((error) => {
console.error('Error with Inquirer prompt:', error);
});
}

//*FUNCTIONS FOR EACH MENU OPTION*//
function viewAllEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    if (err) throw err;
    console.table(results);
    displayMainMenu();
  });
}


function AddEmployee(){
  console.log('This will be done after checks.');
  displayMainMenu(); 
}

function updateEmployeeRole(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function viewAllRoles(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function addRole(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function viewAllDepartments(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function addDepartment(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function Exit(){console.log('This will be done after checks.');
displayMainMenu(); 
}
