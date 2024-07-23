const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = ['Description', 'Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'];

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
            fs.appendFile('README.md', generateMarkdown(question, response.License), (err) => err? console.error(err) : console.log(''));
        })
    } else if (question === 'Questions') {
      await inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your github username',
        },
        {
          type: 'input',
          name: 'email',
          message: 'Please enter your email'
        }
    ])
    .then((response) => {
        fs.appendFile('README.md', generateMarkdown(question, [response.github, response.email]), (err) => err? console.error(err) : console.log(''));
    })
    }
    
    else {
        await inquirer.prompt([
            {
                type: 'input',
                name: 'answer',
                message: question
            }
        ])
        .then((response) => {
            fs.appendFile('README.md', generateMarkdown(question, response.answer), (err) => err? console.error(err) : console.log(''));
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
    fs.writeFile('README.md', `# ${response.title} \n`, (err) => err? console.error(err) : console.log(''));
  });
  fs.appendFile('README.md', `## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions) \n`, (err) => err? console.error(err) : console.log(''));
  for await (const question of questions) {
    await createSection(question)
  }

}

// Function call to initialize app
init();
