const {Gitlab} = require('gitlab');

module.exports = {
  connect,
  issues: {
    create: createIssue,
  }
};

let gitlab = null;

async function connect(config) {
  gitlab = new Gitlab(config);

  return this;
}

async function createIssue(title, description) {
  return gitlab.Issues.create(104, {title, description});
}

async function showIssue() {
  return gitlab.Issues.all(104);
}