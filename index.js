require(`dotenv`).config()
const inquirer = require(`inquirer`);
const cTable = require(`console.table`);
const database = require(`./config/connection`);
const {
  generateInquirerListPrompt,
  generateInquirerPromptChoicesFromDbQuery,
} = require(`./helpers/helperFunctions`)

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
  viewDepartmentBudgets,
  generateListOfManagers,
} = require(`./dbInteraction/dbFunctions`);

let getManagerPrompt = async () => {
  let dbquery = await generateListOfManagers()
  let choices = await generateInquirerPromptChoicesFromDbQuery(dbquery)
  return generateInquirerListPrompt(choices, 'managerSelection', 'Please choose a manager')
}

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
    case 'View employees under a specific manager': //
      await getManagerPrompt()
        .then(async (managerPrompt) => {
          let choice = await inquirer.prompt(managerPrompt);
          return choice.managerSelection;
        })
        .then(choice => viewEmployeesByManager(choice));
      break;
    case 'View employees in a specific department': //ADD PROMPT FOR DEPARTMENT
      await viewEmployeesByDepartment();
      break;
    case 'View all department salary budgets':
      await viewDepartmentBudgets();
      break;
    case 'Add a new company department': //ADD PROMPT FOR DEPARTMENT name
      await addNewDepartment();
      break;
    case 'Add a new company role': //ADD PROMPT FOR ROLE title, salary, department_id
      await addNewRole();
      break;
    case 'Add a new company employee': //ADD PROMPT FOR EMPLOYEE first_name, last_name, role_id, manager_id
      await addNewEmployee();
      break;
    case "Update an employee's role": //show list of employees, ask to enter the employee_id, then ask for department transferring to, then query db for roles in department and push to question choices, then prompt if they want to update employee manager. 
      await updateEmployeeRole();
      break;
    case "Update an employee's manager": //ADD PROMPT FOR EMPLOYEE manager_id
      await updateEmployeeManager();
      break;
    case "Delete a company department": //ADD PROMPT FOR DEPARTMENT name, WARN THAT ALL ROLES AND EMPLOYEES IN THAT DEPARTMENT WILL ALSO BE DELETED.
      await deleteDepartment();
      break;
    case "Delete a company role": //ADD PROMPT FOR ROLE title, WARN THAT ALL EMPLOYEES IN THAT ROLE WILL ALSO BE DELETED
      await deleteRole();
      break;
    case "Delete a company employee": //ADD PROMPT TO DELETE EMPLOYEE BY ID - view employees and ID's - QUERY FOR ALL ROLES AND NOTIFY USER OF ROLES THAT ARE UNFILLED.
      await deleteEmployee();
      break;
    case "Exit employee database":
      exitDatabase();
      return "exit";
  }
}

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
      await answerSwitch(previousAnswer);
      await nextActionPrompt(previousAnswer);
      break;
    case `Exit Employee database`:
      exitDatabase();
      return;
  }
};

let init = () => {
  inquirer.prompt(questions)
    .then(async (answer) => {
      let previousAnswer = answer.selectAction;
      let exit = await answerSwitch(previousAnswer);
      if (exit) {
        return;
      }
      await nextActionPrompt(previousAnswer);
    })
}

// let generateInquirerListPrompt = (choices, nameOfAnswer, message) => {
//   let prompt = {
//     type: 'list',
//     name: nameOfAnswer,
//     message: message,
//     choices: choices
//   }
//   // console.log(prompt)
//   return prompt;
// }

init();




// getManagerPrompt().then((result) => {
//   console.log(`\n\nRETURN OF getManagerPrompt IS AS FOLLOWS: \n\n`, result)
// })



