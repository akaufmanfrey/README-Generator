const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = ['Description', 'Installation', 'Usage', 'License', 'Contributing', 'Tests'];

// TODO: Create a function to write README file
async function createSection(question) {
    if (question === 'License') {
        await inquirer.prompt([
            {
                type: 'list',
                name: 'License',
                message: 'License:',
                choices: ['MIT', 'Apache 2.0', 'Unlicense', 'ISC']
            }
        ])
        .then((response) => {
            fs.appendFile('README.md', generateMarkdown(question, response.license), (err) => err? console.error(err) : console.log('Success'));
        })
    } else {
        await inquirer.prompt([
            {
                type: 'input',
                name: 'answer',
                message: question
            }
        ])
        .then((response) => {
            fs.appendFile('README.md', generateMarkdown(question, response.answer), (err) => err? console.error(err) : console.log('Success'));
        })
    }
}

// TODO: Create a function to initialize app
async function init() {
  await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
  ])
  .then((response) => {
    fs.writeFile('README.md', `# ${response.title} \n`, (err) => err? console.error(err) : console.log('Success'));
  });
  for await (const question of questions) {
    await createSection(question)
  }

}

// Function call to initialize app
init();
