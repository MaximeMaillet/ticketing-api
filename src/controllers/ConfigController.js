const config = require('../services/config');

module.exports = {
  getAll,
};

async function getAll(req, res, next) {
  const conf = await config.read({name: 'Real'});
  if(conf.length === 0) {
    return res.status(404).send({
      message: 'Config not found'
    })
  }

  const oneConfig = conf[0];
  delete oneConfig['token'];
  return res.send(oneConfig);
}