function renderBadge(licence) {
  switch (licence) {
    case 'GNU AGPLv3': return `![GNU AGPLv3](https://img.shields.io/badge/license-GNU%20AGPLv3-brightgreen)`;
    case 'GNU GPLv3': return `![GNU GPLv3](https://img.shields.io/badge/license-GNU%20GPLv3-brightgreen)`;
    case 'GNU LGPLv3': return `![GNU LGPLv3](https://img.shields.io/badge/license-GNU%20LGPLv3-brightgreen)`;
    case 'Mozilla Public 2.0': return `![Mozilla Public License 2.0](https://img.shields.io/badge/license-Mozilla%20Public%202.0-brightgreen)`;
    case 'Apache 2.0': return `![Apache License 2.0](https://img.shields.io/badge/license-Apache%202.0-brightgreen)`;
    case 'MIT': return `![MIT License](https://img.shields.io/badge/license-MIT-brightgreen)`;
    case 'Boost Software 1.0': return `![Boost Software License 1.0](https://img.shields.io/badge/license-Boost%20Software%201.0-brightgreen)`;
    case 'The Unilicense': return `![The Unilicense](https://img.shields.io/badge/license-Unlicense-brightgreen)`;
  }
}

function generateInstallation(installation) {
  const steps = installation.split(', ');

  return `
    ${steps.map((element, index) => {
      return `
      ${index++}. ${element}
      `
    })
  }`
};

function generateLicense(license) {
  switch (license) {
    case 'GNU AGPLv3': return `[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)`;
    case 'GNU GPLv3': return `[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)`;
    case 'GNU LGPLv3': return `[GNU LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/)`;
    case 'Mozilla Public 2.0': return `[Mozilla Public License 2.0](https://choosealicense.com/licenses/mpl-2.0/)`;
    case 'Apache 2.0': return `[Apache Licence 2.0](https://choosealicense.com/licenses/apache-2.0/)`;
    case 'MIT': return `[MIT License](https://choosealicense.com/licenses/mit/)`;
    case 'Boost Software 1.0': return `[Boost Software License 1.0](https://choosealicense.com/licenses/bsl-1.0/)`;
    case 'The Unilicense': return `[The Unilicese](https://choosealicense.com/licenses/unlicense/)`;
  }
};

function generateCredits(credits) {
  if(!credits) {
    return ''
  }

  return `
  ## Credits
  ${credits.map(({ contributor }) => {
      return `[${contributor}](https://github.com/${contributor}) `;
  })
  .join('')}
  `
};

// TODO: Create a function to generate markdown for README
module.exports = markdownData => {
  const { installation, license, credits, ...data} = markdownData;
  return `
  # ${data.title}

  ${renderBadge(license)}

  ## Description
  ${data.description}

  [Deployed Application](${data.link})

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [License](#license)
  * [Credits](#credits)
  * [Questions](#questions)

  ## Installation
  ${generateInstallation(installation)}

  ## Usage
  ${data.usage}

  ## Contributing
  ${data.contributing}

  ## Tests
  ${data.tests}

  ## License
  ${generateLicense(license)}

  ${generateCredits(credits)}

  ## Questions
  [My GitHub](https://github.com/${data.github})
  [Email Me](mailto:${data.email})
`;
}

