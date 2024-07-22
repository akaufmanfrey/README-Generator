// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return `https://img.shields.io/badge/License-${license.replace(' ', '_')}`
}
// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return `https://opensource.org/licenses/${license.replace(' ', '-')}`
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return `[![License](${renderLicenseBadge(license)})](${renderLicenseLink(license)}) \n Click the above badge to see the license.`
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(title, data) {
  if (title === 'License') {
    return `## ${title} \n
    ${renderLicenseSection(data)} \n
    `;
  } else {
    return `## ${title} \n
    ${data} \n`
  }
}

module.exports = generateMarkdown;
