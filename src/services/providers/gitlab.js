const {Gitlab} = require('gitlab');

module.exports = {
  connect,
  issues: {
    create: createIssue,
  }
};

let gitlab = null;

async function connect() {
  gitlab = new Gitlab({
    host:   'https://gitlab.eoko-lab.fr',
    token: 'WrkyCmKYxxsu5kT-LhE3'
  });

  return this;
}

async function createIssue(title, description) {
  return gitlab.Issues.create(104, {title, description});
}

async function showIssue() {
  return gitlab.Issues.all(104);
}