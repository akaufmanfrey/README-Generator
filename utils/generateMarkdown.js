// Returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return license? `https://img.shields.io/badge/License-${license.replace(' ', '_')}-blue.svg` : ''
}
// Returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return license? `https://opensource.org/licenses/${license.replace(' ', '-')}` : ''
}

// Returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return license? `[![License: ${license}](${renderLicenseBadge(license)})](${renderLicenseLink(license)})\n\nClick the above badge to see the license.` : ''
}

// Generates a single section of the markdown
function generateMarkdown(title, data) {
  if (title === 'License') {
    return `## ${title}\n${renderLicenseSection(data)}\n`;
  } else if (title === 'Questions') {
      return `## Questions\nGithub: https://github.com/${data[0]} \n\nIf you have any questions email me at: ${data[1]}`
  } else {
    return `## ${title}\n${data}\n`
  }
}

module.exports = generateMarkdown;
