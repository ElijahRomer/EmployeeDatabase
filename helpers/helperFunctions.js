module.exports = {
  generateInquirerPromptChoicesFromDbQuery: async (queryArray, nameOfQuestion, messageOfQuestion) => {
    let choices = queryArray.map((element, index) => {
      let choice = [];
      for (let attribute in element) {
        choice.push(element[attribute])
      }
      return choice.join(' - ');
    })
    return choices;
  },

  generateInquirerListPrompt: (choices, nameOfAnswer, message) => {
    let prompt = {
      type: 'list',
      name: nameOfAnswer,
      message: message,
      // pageSize: choices.length,
      choices: choices
    }
    return prompt;
  },
}