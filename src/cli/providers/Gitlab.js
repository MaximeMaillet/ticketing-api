const inquirer = require('inquirer');
const fs = require('fs');
const {Gitlab} = require('gitlab');

module.exports = {
  init,
  connect,
  getProjects,
};

let gitlab = null;

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name :'
  },
  {
    type: 'input',
    name: 'host',
    message: 'Gitlab host :'
  },
  {
    type: 'input',
    name: 'token',
    message: 'Gitlab token : '
  }
];

async function init() {
  const credentials = await inquirer.prompt(questions);
  await connect(credentials);
  const projects = await getProjects();

  return {
    credentials,
    projects,
  }
}

async function getProjects() {
  console.log('Waiting ...');
  return (await gitlab.Projects.all()).map((item) => {
    return {
      name: item.name_with_namespace,
      id: item.id,
    }
  });
}

async function connect(credentials) {
  gitlab = new Gitlab({
    host: credentials.host,
    token: credentials.token,
  });

  return credentials;
}