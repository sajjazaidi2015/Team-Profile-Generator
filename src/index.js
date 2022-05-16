const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("../lib/manager");
const Engineer = require("../lib/engineer");
const Intern = require("../lib/intern");
const generateHtmlString = require('../utils/generateMarkdown');

const question_manager = [
  {
    type: "input",
    name: "id",
    message: "Enter the Manager ID",
    //TODO: add validation of ID that ID should > 0
    validate: function (id) {
      var num = /^[0-9 ]+$/
      if (!id.match(num)) {
        return "Please provide the ID of the Manager";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Manager name",
    //TODO: add validation of ID that ID should > 0
    validate: function (name) {
      var pattern = /^[a-zA-Z ]+$/
      if (!name.match(pattern)) {
        return "Please provide the name of the Manager";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Manager email",
    //TODO: add validation of ID that ID should > 0
    validate: function(email)
    {
        if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)) {
          return true;
        }
        // Regex mail check (return true if valid mail)
        return 'Please enter a valid email adddress.';
    }
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter the Manager Office Number",
    //TODO: add validation of ID that ID should > 0
    validate: function (officeNumber) {
      var num = /^[0-9 ]+$/
      if (!officeNumber.match(num)) {
        return "Please provide the ID of the Manager";
      }
      return true;
    },
  },
];
const question_engineer = [
  {
    type: "input",
    name: "id",
    message: "Enter the Engineer ID",
    //TODO: add validation of ID that ID should > 0
    validate: function (id) {
      var num = /^[0-9 ]+$/
      if (!id.match(num)) {
        return "Please provide the ID of the Engineer";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Engineer name",
    //TODO: add validation of ID that ID should > 0
    validate: function (name) {
      var pattern = /^[a-zA-Z ]+$/
      if (!name.match(pattern)) {
        return "Please provide the name of the Engineer";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Engineer email",
    //TODO: add validation of ID that ID should > 0
    validate: function(email)
    {
        if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)) {
          return true;
        }
        // Regex mail check (return true if valid mail)
        return 'Please enter a valid email adddress.';
    }
  },
  {
    type: "input",
    name: "github",
    message: "Enter the Engineer GitHub",
    //TODO: add validation of ID that ID should > 0
    validate: function (github) {
      if (github.length > 0) {
        return true;
      }
      return "Please Provide a project title";
    },
  },
  {
    type: "confirm",
    name: "is_finished",
    message: "Are you finished adding Engineers?",
    //TODO: add validation of ID that ID should > 0
  },
];
const question_intern = [
  {
    type: "input",
    name: "id",
    message: "Enter the Intern ID",
    //TODO: add validation of ID that ID should > 0
    validate: function (id) {
      var num = /^[0-9 ]+$/
      if (!id.match(num)) {
        return "Please provide the ID of the Intern";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Intern name",
    //TODO: add validation of ID that ID should > 0
    validate: function (name) {
      var pattern = /^[a-zA-Z ]+$/
      if (!name.match(pattern)) {
        return "Please provide the name of the Intern";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Intern email",
    //TODO: add validation of ID that ID should > 0
    validate: function(email)
    {
        if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)) {
          return true;
        }
        // Regex mail check (return true if valid mail)
        return 'Please enter a valid email adddress.';
    }
  },
  {
    type: "input",
    name: "school",
    message: "Enter the Intern School",
    //TODO: add validation of ID that ID should > 0
    validate: function (name) {
      var pattern = /^[a-zA-Z ]+$/
      if (!name.match(pattern)) {
        return "Please provide the School Name of the Intern";
      }
      return true;
    }
  },
  {
    type: "confirm",
    name: "is_finished",
    message: "Are you finished adding Interns?",
    //TODO: add validation of ID that ID should > 0
  },
];
async function getManagerAnswer() {
  return inquirer.prompt(question_manager);
}

async function getEngineerAnswer(engineers) {
  if (!engineers) {
    engineers = [];
  }
  const engineer_answers = await inquirer.prompt(question_engineer);
  engineers.push(engineer_answers);
  return engineer_answers.is_finished
    ? engineers
    : getEngineerAnswer(engineers);
}

async function getInternAnswer(interns) {
  if (!interns) {
    interns = [];
  }
  const intern_answer = await inquirer.prompt(question_intern);
  interns.push(intern_answer);
  if (intern_answer.is_finished) {
    return interns;
  } else {
    return getInternAnswer(interns);
  }
}
async function init() {
  const manager_answers = await getManagerAnswer();
  const engineer_answers = await getEngineerAnswer();
  const intern_answer = await getInternAnswer();

  const { id, name, email, officeNumber } = manager_answers;

  const manager = new Manager(parseInt(id), name, email, parseInt(officeNumber));
  const engineers = engineer_answers.map(({id, name, email, github}) => new Engineer(parseInt(id), name, email, github))
  const interns = intern_answer.map(({id, name, email, school}) => new Intern(parseInt(id), name, email, school))

  const data = {
    manager: manager,
    engineers: engineers,
    interns: interns,
  };
  fs.readFile(__dirname + "/template/index.html", (error, template) => {
    if (error) {
      throw error;
    }

    // Populating Manager data
    const htmlString = generateHtmlString(template, data);
    fs.writeFile("./dist/org.html", htmlString, (err) =>
      err ? console.log(err) : console.log("Success!")
    );
  });
}



init();

