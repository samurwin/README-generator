// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const { deserialize } = require('v8');
// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter a title.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a detailed description of your application (Required)',
            validate: descriptionInput => {
                if(descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide description.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Provide a link to the deployed application (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide a link to the deployed application');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'What licence are you using on this project?',
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public 2.0', 'Apache 2.0', 'MIT', 'Boost Software 1.0', 'The Unlicense'],
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide a description of how to use your app (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a description of how to use your app');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Provide a step-by-step description of how to get the development environment running. Seperate steps with an "," (Recommended)'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'If you would like other developers to be able to contribute to this application, please provide guidelines on how to do so (Recommended)'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide examples of how to run tests on your application (Recommended)'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Provide the link to your GitHub (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please provide GitHub link');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Provide an email where you can be contacted (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please provide an email.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmCredits',
            message: 'Are there other contributors for this project you would like to credit?',
            default: false
        }
    ])
};

const addCredits = readmeData => {
    if (!readmeData.credits) {
        readmeData.credits = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'contributor',
            message: 'Provide the GitHub username of the contributor:',
        },
        {
            type: 'confirm',
            name: 'confirmAddCredit',
            message: 'Would you like to credit another contributor?',
            default: false
        }
    ])
    .then (credit => {
        readmeData.credits.push(credit);
        if (credit.confirmAddCredit){
            addCredits(readmeData);
        } else {
            return generateMarkdown(readmeData);
        }
    })
    .then(markdown => {
        writeToFile(markdown);
    })
};

// TODO: Create a function to write README file
function writeToFile(data) {
    fs.writeFile('./dist/README.md', data, err =>{
        if (err) throw err;
        console.log('README file complete!');
    })
}

// Function call to initialize app
questions()
.then(readmeData => {
    if(readmeData.confirmCredits) {
        addCredits(readmeData);
    } else {
        console.log(generateMarkdown(readmeData));
    }
});

