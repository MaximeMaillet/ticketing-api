const fs = require('fs');
const path = require('path');
const configFile = `${path.resolve('.')}/config/provider.json`;

module.exports = {
  write,
  read,
};

async function write(config, isNew) {
  isNew = isNew || false;
  const configs = await read();

  if(isNew) {
    configs.push(config);
  } else {
    for (const i in configs) {
      if(configs[i].name === config.name) {
        configs[i] = config;
      }
    }
  }

  return fs.writeFileSync(configFile, JSON.stringify(configs))
}

async function read(filter) {
  const config = JSON.parse(fs.readFileSync(configFile));
  if(!filter) {
    return config;
  }

  const response = [];
  const filters = Object.keys(filter);
  for (const i in config) {
    for(const j in filters) {
      if(config[i][filters[j]]) {
        if(config[i][filters[j]] === filter[filters[j]]) {
          response.push(config[i]);
        }
      }
    }
  }

  return response;
}