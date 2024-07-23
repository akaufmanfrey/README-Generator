const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions for user input
const questions = ['Description', 'Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'];

// Generates a specific section of the README, waits for the promise before continuing to execute
async function createSection(question) {
  // Since the license section needs a badge and a list of options, it is given its own specific code
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
      // Since the questions section has a link to a github and an email, it has its own specific code
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
      // Every other section is generated identically so they have generic code
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

// Function to initialize app
async function init() {
  // Prompt for title of the project with waits for the promise before continuing to execute
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
  // Add table of contents
  fs.appendFile('README.md', `## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions) \n`, (err) => err? console.error(err) : console.log(''));
// Make calls  to create section, waiting for each call to finish executing before continuing
  for await (const question of questions) {
    await createSection(question)
  }

}

// Function call to initialize app
init();
