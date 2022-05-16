const cheerio = require("cheerio");

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


module.exports = generateHtmlString;