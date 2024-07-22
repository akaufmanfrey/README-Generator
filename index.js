const inquirer = require("inquirer");
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Give a description of your project.',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Give installation instructions.',
      name: 'installation',
    },
    {
        type: 'input',
        message: 'Give usage instructions.',
        name: 'usage',
      },
      {
        type: 'input',
        message: 'What are your contribution guidelines?',
        name: 'contributing',
      },
      {
        type: 'input',
        message: 'Give test instructions',
        name: 'tests',
      },
  ])
  .then((response) => {
    fs.writeFile('README.md', `# ${response.title} \n`, (err) => err? console.error(err) : console.log('Success'));
    fs.appendFile('README.md', `## Description \n ${response.description} \n`, (err) => err? console.error(err) : console.log('Success'));
    fs.appendFile('README.md', `## Installation \n ${response.installation} \n`, (err) => err? console.error(err) : console.log('Success'));
    fs.appendFile('README.md', `## Usage \n ${response.usage} \n`, (err) => err? console.error(err) : console.log('Success'));
    fs.appendFile('README.md', `## Contributing \n ${response.contributing} \n`, (err) => err? console.error(err) : console.log('Success'));
    fs.appendFile('README.md', `## Tests \n ${response.tests} \n`, (err) => err? console.error(err) : console.log('Success'));
  });
