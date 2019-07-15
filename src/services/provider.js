module.exports = {
  postIssue,
};

let provider = null;

function chooseProvider() {
  return 'gitlab';
}

async function connectProvider() {
  const _provider = require(`./providers/${chooseProvider()}`);
  return _provider.connect();
}

async function postIssue(title, description) {
  if (!provider) {
    provider = await connectProvider();
  }

  return provider.issues.create(title, description);
}