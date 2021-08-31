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


// viewAllDepartments(); //none
// viewAllRoles();//none
// viewAllEmployees(); //none
// viewEmployeesByManager(`Badger`); //managerLastName
// viewEmployeesByDepartment(`Management`); //department
// viewDepartmentBudgets(); //none

// addNewDepartment(); //departmentName
// addNewRole(); //title, salary, department_id
// addNewEmployee(); //first_name, last_name, roleId, managerId

// updateEmployeeRole(`Manager`, 9); //newRole, employeeId - need to update employee manager when this is run
// updateEmployeeManager();


// deleteDepartment();
// deleteRole();
// deleteEmployee();

let questions = [
  {
    type: 'list',
    name: 'selectAction',
    message: 'What would you like to do?',
    pageSize: 18,
    // loop: true,
    choices: [
      'View all company departments',
      'View all company roles',
      'View all company employees',
      'View employees under a specific manager',
      'View employees in a specific department',
      'View all department salary budgets',
      new inquirer.Separator(),
      'Add a new company department',
      'Add a new company role',
      'Add a new company employee',
      new inquirer.Separator(),
      "Update an employee's role",
      "Update an employee's manager",
      new inquirer.Separator(),
      "Delete a company department",
      "Delete a company role",
      "Delete a company employee",
      new inquirer.Separator(),
      "Exit employee database",
      new inquirer.Separator()
    ]
  },

];

let nextActionQuestions = [{
  type: `list`,
  name: `nextAction`,
  message: 'What would you like to do now?',
  choices: [
    `Run a different query or command`,
    `Repeat same query`,
    `Exit Employee database`
  ]
}];

let exitDatabase = () => {
  console.log(`\n\nGoodbye!\n\n`)
  database.close();
}

let nextActionPrompt = async (previousAnswer) => {
  let nextAction = await inquirer.prompt(nextActionQuestions);
  switch (nextAction.nextAction) {
    case `Run a different query or command`:
      init();
      break;
    case `Repeat same query`:
      console.log(previousAnswer);
      repeatActionPrompt(previousAnswer)
      break;
    case `Exit Employee database`:
      exitDatabase();
  }
}

let answerSwitch = async (answer) => {
  switch (answer) {
    case 'View all company departments':
      await viewAllDepartments();
      break;
    case 'View all company roles':
      await viewAllRoles();
      break;
    case 'View all company employees':
      await viewAllEmployees();
      break;
    case 'View employees under a specific manager':
      await viewEmployeesByManager();
      break;
    case 'View employees in a specific department':
      await viewEmployeesByDepartment();
      break;
    case 'View all department salary budgets':
      await viewDepartmentBudgets();
      break;
    case 'Add a new company department':
      await addNewDepartment();
      break;
    case 'Add a new company role':
      await addNewRole();
      break;
    case 'Add a new company employee':
      await addNewEmployee();
      break;
    case "Update an employee's role":
      await updateEmployeeRole();
      break;
    case "Update an employee's manager":
      await updateEmployeeManager();
      break;
    case "Delete a company department":
      await deleteDepartment();
      break;
    case "Delete a company role":
      await deleteRole();
      break;
    case "Delete a company employee":
      await deleteEmployee();
      break;
    case "Exit employee database":
      exitDatabase();
      return;
  }
}

let init = () => {
  inquirer.prompt(questions)
    .then(async (answer) => {
      console.log(answer.selectAction);
      let previousAnswer = answer.selectAction;
      switch (answer.selectAction) {
        case 'View all company departments':
          await viewAllDepartments();
          break;
        case 'View all company roles':
          await viewAllRoles();
          break;
        case 'View all company employees':
          await viewAllEmployees();
          break;
        case 'View employees under a specific manager':
          await viewEmployeesByManager();
          break;
        case 'View employees in a specific department':
          await viewEmployeesByDepartment();
          break;
        case 'View all department salary budgets':
          await viewDepartmentBudgets();
          break;
        case 'Add a new company department':
          await addNewDepartment();
          break;
        case 'Add a new company role':
          await addNewRole();
          break;
        case 'Add a new company employee':
          await addNewEmployee();
          break;
        case "Update an employee's role":
          await updateEmployeeRole();
          break;
        case "Update an employee's manager":
          await updateEmployeeManager();
          break;
        case "Delete a company department":
          await deleteDepartment();
          break;
        case "Delete a company role":
          await deleteRole();
          break;
        case "Delete a company employee":
          await deleteEmployee();
          break;
        case "Exit employee database":
          exitDatabase();
          return;
      }
      nextActionPrompt(previousAnswer);
    })
}

let repeatActionPrompt = async (previousAnswer) => {
  // console.log(previousAnswer);
  switch (previousAnswer) {
    case 'View all company departments':
      await viewAllDepartments();
      break;
    case 'View all company roles':
      await viewAllRoles();
      break;
    case 'View all company employees':
      await viewAllEmployees();
      break;
    case 'View employees under a specific manager':
      await viewEmployeesByManager();
      break;
    case 'View employees in a specific department':
      await viewEmployeesByDepartment();
      break;
    case 'View all department salary budgets':
      await viewDepartmentBudgets();
      break;
    case 'Add a new company department':
      await addNewDepartment();
      break;
    case 'Add a new company role':
      await addNewRole();
      break;
    case 'Add a new company employee':
      await addNewEmployee();
      break;
    case "Update an employee's role":
      await updateEmployeeRole();
      break;
    case "Update an employee's manager":
      await updateEmployeeManager();
      break;
    case "Delete a company department":
      await deleteDepartment();
      break;
    case "Delete a company role":
      await deleteRole();
      break;
    case "Delete a company employee":
      await deleteEmployee();
      break;
    case "Exit employee database":
      exitDatabase();
      return;
  }
  nextActionPrompt(previousAnswer);
}

init();




