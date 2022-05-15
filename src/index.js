const inquirer = require("inquirer");
const fs = require("fs");
const cheerio = require("cheerio");
const Manager = require("../lib/manager");
const Engineer = require("../lib/engineer");
const Intern = require("../lib/intern");

const question_manager = [
  {
    type: "input",
    name: "id",
    message: "Enter the Manager ID",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Manager name",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Manager email",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter the Manager Office Number",
    //TODO: add validation of ID that ID should > 0
  },
];
const question_engineer = [
  {
    type: "input",
    name: "id",
    message: "Enter the Engineer ID",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Engineer name",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Engineer email",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "github",
    message: "Enter the Engineer GitHub",
    //TODO: add validation of ID that ID should > 0
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
  },
  {
    type: "input",
    name: "name",
    message: "Enter the Intern name",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "email",
    message: "Enter the Intern email",
    //TODO: add validation of ID that ID should > 0
  },
  {
    type: "input",
    name: "school",
    message: "Enter the Intern School",
    //TODO: add validation of ID that ID should > 0
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
// create a body for enigineer
// append header and body into the div tag
// append the div tag into the main HTML page

function generateHtmlString(template, data) {
  const $ = cheerio.load(template.toString());
  const { manager, engineers, interns } = data;
  const managerCard = generateManagerCard(manager);
  const engineerCard = engineers.reduce((acc, curr) => {
    acc = acc + generateEngineerCard(curr);
    return acc;
  }, "");

  const internCard = interns.reduce((acc, curr) => {
    acc = acc + generateInternCard(curr);
    return acc;
  }, "");

  $(".manager").html(managerCard);
  $(".engineers").html(engineerCard);
  $(".interns").html(internCard);

  return $.html();
}

function generateManagerCard(manager) {
  const managerCardHeaderTemplate = getCardHeaderTemplate(
    manager.getName(),
    manager.getRole()
  );
  const managerCardBodyTemplate = getBodyTemplateForManager(
    manager.getId(),
    manager.getEmail(),
    manager.getOfficeNumber()
  );
  return `
    <div>
    ${managerCardHeaderTemplate}
    ${managerCardBodyTemplate}
    </div>
  `;
}

function generateEngineerCard(engineers) {
  const engineerCardHeaderTemplate = getCardHeaderTemplate(
    engineers.getName(),
    engineers.getRole()
  );
  const engineerCardBodyTemplate = getBodyTemplateForEngineer(
    engineers.getId(),
    engineers.getEmail(),
    engineers.getGithub()
  );
  return `
  <div>
  ${engineerCardHeaderTemplate}
  ${engineerCardBodyTemplate}
  </div>
  `;
}
function generateInternCard(interns) {
  const internCardHeaderTemplate = getCardHeaderTemplate(
    interns.getName(),
    interns.getRole()
  );
  const internCardBodyTemplate = getBodyTemplateForIntern(
    interns.getId(),
    interns.getEmail(),
    interns.getSchool()
  );
  return `
  <div>
  ${internCardHeaderTemplate}
  ${internCardBodyTemplate}
  </div>
  `;
}

function getCardHeaderTemplate(name, role) {
  return `
    <div class="card-header">
      <h3>${name}</h3>
      <h4>${role}</h4>
    </div>
  `;
}

function getBodyTemplateForManager(id, email, officeNumber) {
  return `
    <div class="card-body">
      <p class="id">ID: ${id}</p>
      <p class="email">Email: <a href="mailto:${email}">${email}</a></p>
      <p class="office">Office Number: ${officeNumber}</p>
    </div>
  `;
}
function getBodyTemplateForEngineer(id, email, github) {
  return `
    <div class="card-body">
      <p class="id">ID: ${id}</p>
      <p class="email">Email: <a href="mailto:${email}">${email}</a></p>
      <p class="office">Github: ${github}</p>
    </div>
  `;
}
function getBodyTemplateForIntern(id, email, school) {
  return `
    <div class="card-body">
      <p class="id">ID: ${id}</p>
      <p class="email">Email: <a href="mailto:${email}">${email}</a></p>
      <p class="office">School: ${school}</p>
    </div>
  `;
}

init();


// Create template for Engineer and interns
// move generate temnplate logic to utils like previous assignment
// turn on the iquirer for the questions and remove hardcoded values
// fix the css styles on the html and make it match exact
// add validation on the inquirere
