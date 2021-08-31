const {
  capitalizeFirstLetter,
  generateInquirerPromptChoicesFromDbQuery,
  generateInquirerListPrompt
} = require(`../helpers/helperFunctions`);

const {
  queryListOfManagers,
  queryListOfDepartments,
} = require(`./dbFunctions`)

module.exports = {
  getManagerPrompt: async function () {
    let dbquery = await queryListOfManagers()
    let choices = await generateInquirerPromptChoicesFromDbQuery(dbquery)
    return generateInquirerListPrompt(choices, 'managerSelection', 'Please choose a manager:')
  },

  getDepartmentPrompt: async function () {
    let dbquery = await queryListOfDepartments();
    let choices = await generateInquirerPromptChoicesFromDbQuery(dbquery)
    return generateInquirerListPrompt(choices, 'departmentSelection', 'Please choose a department:')
  }
};
