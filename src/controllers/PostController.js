module.exports = {
  post,
};

const provider = require('../services/provider');

async function post(req, res) {
  const {body} = req;

  try {
    if(body.provider) {
      await provider.connect(body.provider);
    }
    await provider.postIssue(body.title, body.description);
  } catch(e) {
    console.log(e);
  }

  res.send('ok');
}