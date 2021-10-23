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
            message: 'What is the title of your project?',
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
            message: 'Provide a detailed description of your application:',
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
            message: 'Provide a link to the deployed application:'
        },
        {
            type: 'list',
            name: 'licence',
            message: 'What licence are you using on this project?',
            choices: ['None', /* Choices go here */],
            default: 'None',
        },
        {
            type: 'input',
            name: 'screenshot',
            message: 'Provide the relative path link to a screenshot of your application:'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide a description of how to use your app:'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Provide the link to your GitHub:',
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
            message: 'Provide an email where you can be contacted:',
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
            name: 'confirmContributors',
            message: 'Are there other contributors for this project?',
            default: false
        }
    ])
};

const contributors = readmeData => {
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
            name: 'confirmAddContributers',
            message: 'Would you like to credit another contributor?',
            default: false
        }
    ])
    .then (credit => {
        readmeData.credits.push(credit);
        if (credit.confirmAddContributers){
            contributors(readmeData);
        } else {
            return readmeData;
        }
    })
};

const installation = readmeData => {

};

const tests = readmeData => {

}

const contribution = readmeData => {

}
// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
