require(`dotenv`).config()
const inquirer = require(`inquirer`);
const cTable = require(`console.table`);
const database = require(`./config/connection`);

const {
  capitalizeFirstLetter,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addNewDepartment,
  addNewRole,
  addNewEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudgets
} = require(`./dbInteraction/dbFunctions`);


// viewAllDepartments();
// viewAllRoles();
// viewAllEmployees();
// viewEmployeesByManager(`Badger`);
// viewEmployeesByDepartment(`Management`);
viewDepartmentBudgets();

// addNewDepartment();
// addNewRole();
// addNewEmployee();

// updateEmployeeRole();
// updateEmployeeManager();


// deleteDepartment();
// deleteRole();
// deleteEmployee();





