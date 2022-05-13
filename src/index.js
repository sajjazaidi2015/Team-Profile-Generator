const inquirer = require("inquirer");

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
    if (!interns){
        interns = []
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
  const engineers_answers = await getEngineerAnswer();
  const intern_answer = await getInternAnswer()
  console.log('manager_answers ==>', manager_answers)
  console.log("engineers_answers ==>", engineers_answers);
  console.log('intern_answers ==>', intern_answer)



  
}
init();
