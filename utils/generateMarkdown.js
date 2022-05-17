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
    manager.getRole(),
    manager.getIcon()
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

function generateEngineerCard(engineer) {
  const engineerCardHeaderTemplate = getCardHeaderTemplate(
    engineer.getName(),
    engineer.getRole(),
    engineer.getIcon()
  );
  const engineerCardBodyTemplate = getBodyTemplateForEngineer(
    engineer.getId(),
    engineer.getEmail(),
    engineer.getGithub()
  );
  return `
    <div>
    ${engineerCardHeaderTemplate}
    ${engineerCardBodyTemplate}
    </div>
    `;
}
function generateInternCard(intern) {
  const internCardHeaderTemplate = getCardHeaderTemplate(
    intern.getName(),
    intern.getRole(),
    intern.getIcon()
  );
  const internCardBodyTemplate = getBodyTemplateForIntern(
    intern.getId(),
    intern.getEmail(),
    intern.getSchool()
  );
  return `
    <div>
    ${internCardHeaderTemplate}
    ${internCardBodyTemplate}
    </div>
    `;
}

function getCardHeaderTemplate(name, role, icon) {
  return `
      <div class="card-header">
        <h3>${name}</h3>
        <h4><span><i class="${icon}"></i></span>${role}</h4>
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