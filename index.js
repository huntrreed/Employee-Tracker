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
/*View all employee function*/
function viewAllEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    if (err) throw err;
    console.table(results);
    displayMainMenu();
  });
}

//*Add employee function*//
function addEmployee(){
    db.query('SELECT id, title FROM role', function (roleErr, roles) {
      if (roleErr) throw roleErr;
  
      db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee WHERE manager_id IS NULL', function (mgrErr, managers) {
        if (mgrErr) throw mgrErr;
  
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
          },
          {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
          },
          {
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            type: 'list',
            name: 'managerId',
            message: "Who is the employee's manager?",
            choices: managers.map((manager) => ({
              name: manager.name,
              value: manager.id
            })).concat([{ name: 'None', value: null }])
          }
        ]).then(answers => {
          // Insert the new employee into the database
          const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                         VALUES (?, ?, ?, ?)`;
          const params = [answers.firstName, answers.lastName, answers.roleId, answers.managerId];
          
          db.query(query, params, function (insertErr, insertResults) {
            if (insertErr) throw insertErr;
            console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
            // Return to main menu
            displayMainMenu(); 
          });
        });
      });
    });
  }

/*Function change employee role*/
function updateEmployeeRole() {
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', function (empErr, employees) {
    if (empErr) {
      console.error('Error fetching employees:', empErr);
      return displayMainMenu();
    }

    db.query('SELECT id, title FROM role', function (roleErr, roles) {
      if (roleErr) {
        console.error('Error fetching roles:', roleErr);
        return displayMainMenu();
      }

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Which employee's role do you want to update?",
          choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
        },
        {
          type: 'list',
          name: 'roleId',
          message: "Which role do you want to assign to the selected employee?",
          choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
      ]).then(answers => {


        const updateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(updateQuery, [answers.roleId, answers.employeeId], function (updateErr, updateResults) {
          if (updateErr) {
            console.error('Error updating employee role:', updateErr);
            return displayMainMenu();
          }
          console.log(`Employee's role has been updated!`);
          displayMainMenu();
        });
      });
    });
  });
}

/*Function View All Roles*/
function viewAllRoles() {
  db.query('SELECT DISTINCT title, salary, department_id FROM role', function (err, results) {
    if (err) {
      console.error('Error fetching roles:', err);
      return displayMainMenu();
    }
    console.table(results);
    displayMainMenu();
  });
}

/*Function to Add New Role*/
function addRole(){console.log('This will be done after checks.');
displayMainMenu(); 
}

/*Function to view all departments*/
function viewAllDepartments(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function addDepartment(){console.log('This will be done after checks.');
displayMainMenu(); 
}

function Exit(){console.log('This will be done after checks.');
displayMainMenu(); 
}
