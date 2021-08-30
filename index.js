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
  FROM role
    LEFT JOIN department ON role.department_id = department.id
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
  employee.id as 'Emp. ID',
  employee.first_name AS 'First Name',
  employee.last_name AS 'Last Name',
  role.title AS 'Role',
  role.id AS 'Role ID',
  department.name AS 'Department Name',
  department.id AS 'Dep. ID',
  role.salary AS "Salary USD",
  manager.last_name AS 'Reports To',
  manager.id AS 'Manager Emp. ID'
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

    console.log(`\n\nInsert new department "${capitalizeFirstLetter(departmentName)}" successful. ${result.affectedRows} row(s) affected.\n\n`)
    
  } catch (error) {
    console.error(`DEPARTMENT COULD NOT BE ADDED. SEE FOLLOWING ERROR REPORT: `. error)
  }
};
// addNewDepartment(`Test`); //UNCOMMENT TO TEST
// viewAllDepartments();


let addNewRole = async (title, salary, departmentId) => {
  let sql = `
  INSERT INTO role 
    (title, salary, department_id) 
  VALUE 
    (?, ?, ?)`;
  try {
    let result = await database.query(sql, [title, salary, departmentId]);

    console.log(`\n\nInsert new role "${title}" successful. ${result.affectedRows} row(s) affected.\n\n`)
    
  } catch (error) {
    console.error(`\n\nROLE COULD NOT BE ADDED. SEE FOLLOWING ERROR REPORT: \n\n`, error)
  }
};
// addNewRole(`test`, 50000, 6); //UNCOMMENT TO TEST
// viewAllRoles();



let addNewEmployee = async (firstName, lastName, roleId, managerId) => {
  let sql = `
  INSERT INTO
    employee (first_name, last_name, role_id, manager_id) 
  VALUE (?, ?, ?, ?);`;
  try {
    let result = await database.query(sql, [
      capitalizeFirstLetter(firstName), 
      capitalizeFirstLetter(lastName), 
      roleId, 
      managerId
    ]);

    console.log(`\n\nInsert new employee "${firstName} ${lastName}" successful. ${result.affectedRows} row(s) affected.\n\n`)
    
  } catch (error) {
    console.error(`\n\nEMPLOYEE COULD NOT BE ADDED. SEE FOLLOWING ERROR REPORT: \n\n`, error)
  }
};

// addNewEmployee(`kenneth`, `watson`, 17, 2) //UNCOMMENT TO TEST
// viewAllEmployees();

let updateEmployeeRole = async (roleId, employeeId) => {
  let sql = `
  UPDATE employee
  SET role_id = ?
  WHERE id = ?;`;

  try {
    let result = await database.query(sql, [roleId, employeeId]);

    console.log(`\n\n Employee role update successful. ${result.affectedRows} row(s) affected.\n\n`)
    
  } catch (error) {
    console.error(`\n\nEMPLOYEE ROLE COULD NOT BE UPDATED. SEE FOLLOWING ERROR REPORT: \n\n`, error)
  }
}

// updateEmployeeRole(3, 27); //UNCOMMENT TO TEST
// viewAllEmployees();

let updateEmployeeManager = async (managerId, employeeId) => {
  let sql = `
  UPDATE employee
  SET manager_id = ?
  WHERE id = ?;`;

  try {
    let result = await database.query(sql, [managerId, employeeId]);

    console.log(`\n\n Employee manager update successful. ${result.affectedRows} row(s) affected.\n\n`)
    
  } catch (error) {
    console.error(`\n\nEMPLOYEE MANAGER COULD NOT BE UPDATED. SEE FOLLOWING ERROR REPORT: \n\n`, error)
  }
}

// updateEmployeeManager(3, 26); //UNCOMMENT TO TEST
// viewAllEmployees();


let viewEmployeesByManager = async (managerName) => {
  let sql = `
  SELECT
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    employee.id AS 'Employee ID',
    role.title AS 'Role',
    role.id AS 'Role ID'
  FROM
    employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  WHERE
    employee.manager_id = ?
  ORDER BY
    employee.last_name DESC;`;

  try {
    let managerIdQuery = await database.query(`SELECT id FROM employee WHERE last_name = ?;`, [managerName]);

    if (managerIdQuery.length < 1) {
      console.log(`\n\n The specified manager does not exist. Please check your spelling or try a different manager. \n\n`);
      return;
    }

    let managerId = managerIdQuery[0].id;

    let result = await database.query(sql, [managerId]);
    if (result.length < 1){
      console.log(`\n\nThe specified Manager does not have any direct reports.\n\n`)
      return;
    }
    console.log(`\n\nEmployees reporting to Manager "${managerName}" are as follows:\n\n`)
    console.table(result);
    return;
    
  } catch (error) {
    console.error(`\n\nVIEW EMPLOYEES BY MANAGER WAS UNSUCCESSFUL. SEE FOLLOWING ERROR REPORT: \n\n`, error)
  }
}

// viewEmployeesByManager(`Mowry`); //UNCOMMENT TO TEST