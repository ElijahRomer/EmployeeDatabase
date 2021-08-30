require(`dotenv`).config()
const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const cTable = require(`console.table`);
const database = require(`./config/connection`)

//apparently need to use mysql2 rather than mysql-native

//FUNCTIONS

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//View All Departments 
let viewAllDepartments = async () => {
  let sql = `
  SELECT 
    id AS 'Department ID', 
    name AS 'Department Name'
  FROM 
    department;`;

  try {
    let result = await database.query(sql)
    console.table(result);
    
  } catch (error) {
    console.error(error)
  }
};
    // viewAllDepartments(); //UNCOMMENT TO TEST


//View All Roles 
let viewAllRoles = async () => {
  let sql = `
  SELECT 
    title AS Title, 
    role.id AS "Role ID",
    department.name AS Department,
    salary AS "Annual Salary USD"
  FROM
    department
    LEFT JOIN role ON role.department_id = department.id
  ORDER BY 
    role.id;`;
  try {
    let result = await database.query(sql)
    console.table(result);
    
  } catch (error) {
    console.error(error)
    
  }
};
// viewAllRoles(); //UNCOMMENT TO TEST


let viewAllEmployees = async () => {
  let sql = `
SELECT
  employee.id as 'Employee ID',
  employee.first_name AS 'First Name',
  employee.last_name AS 'Last Name',
  role.title AS 'Role',
  role.id AS 'Role ID',
  department.name AS 'Department Name',
  department.id AS 'Department ID',
  role.salary AS "Annual Salary USD",
  manager.last_name AS 'Reports To',
  manager.id AS 'Manager Employee ID'
FROM
  employee
  INNER JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id
ORDER BY
  employee.role_id;`;

  try {
    let result = await database.query(sql)
    console.table(result);
    
  } catch (error) {
    console.error(error)
    
  }
};
// viewAllEmployees(); //UNCOMMENT TO TEST

let addNewDepartment = async (departmentName) => {
  let sql = `INSERT INTO department (name) VALUE (?);`;
  try {
    let result = await database.query(sql, [capitalizeFirstLetter(departmentName)]);
    console.log(`Department ${capitalizeFirstLetter(departmentName)} successfully added...`)
    
  } catch (error) {
    console.error(`DEPARTMENT COULD NOT BE ADDED. SEE FOLLOWING ERROR REPORT: `. error)
  }
};
// addNewDepartment(`Test`); //UNCOMMENT TO TEST








