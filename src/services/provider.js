const config = require('./config');

module.exports = {
  postIssue,
  connect,
};

let provider = null;

async function connectProvider(conf) {
  const _provider = require(`./providers/${conf.provider.toLowerCase()}`);
  return _provider.connect(conf);
}

async function connect(providerName) {
  const conf = await config.read({name: providerName});
  if(conf.length === 0) {
    throw new Error('No provider');
  }

  provider = await connectProvider(conf[0]);

  return provider;
}

async function postIssue(title, description) {
  return provider.issues.create(title, description);
}