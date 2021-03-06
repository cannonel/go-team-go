const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const teamMembers = [];
// inquirer questions here
// first question function is add manager
function addManager() {
  console.log(`
    =======================
    Team Profile Generator!
    =======================
    `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "To begin, please enter the name of the Team Manager:",
      },
      {
        type: "input",
        name: "managerID",
        message: "Enter the employee ID for this manager:",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter the email for this manager: ",
      },
      {
        type: "input",
        name: "managerOfficeNum",
        message: "Enter the office number for this manager: ",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.managerOfficeNum
      );
      teamMembers.push(manager);
      console.log(teamMembers);
      addNewMember();
    });
}
// then addNewMember will handle engineer OR intern OR finish adding members
// use conditionals to determine which was chosen
// type: checkbox
function addEngineer() {
  console.log(`
    ================
    Add New Engineer
    ================
    `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Please enter the name of the engineer",
      },
      {
        type: "input",
        name: "engineerID",
        message: "Please enter the employee ID number",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Enter their email",
      },
      {
        type: "input",
        name: "github",
        message: "Enter their GitHub username",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.github
      );
      teamMembers.push(engineer);
      addNewMember();
    });
}
function addIntern() {
  console.log(`
    ==============
    Add New Intern
    ==============
    `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Enter the name of the intern",
      },
      {
        type: "input",
        name: "internID",
        message: "Enter the employee ID",
      },
      {
        type: "input",
        name: "internEmail",
        message: "Enter the email of this intern",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the school this intern is attending",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.school
      );
      teamMembers.push(intern);
      addNewMember();
    });
}
// IF finish: deploy => copyFile & writeFile
// ~ notate semantics for parameters
// take ~(data) => generatePage(data)
// then ~(pagehtml) => writeFile(pageHtml)
// then (writeFileResponse) => copyFile()
function addNewMember() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "memberType",
        message:
          "Please select a role to add a new team member, otherwise select finish. ",
        choices: ["Engineer", "Intern", "Finish building team"],
      },
    ])
    .then((choice) => {
      console.log(choice.memberType);
      if (choice.memberType === "Engineer") {
        addEngineer();
      }
      if (choice.memberType === "Intern") {
        addIntern();
      }
      if (choice.memberType === "Finish building team") {
        console.log(teamMembers);
        return finishTeam("./dist/index.html", generateTeam(teamMembers));
      }
    });
}
function finishTeam(fileName, data) {
  console.log(teamMembers);
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("File written. It lives in the ``/dist`` folder!");
    }
  });
}
addManager();