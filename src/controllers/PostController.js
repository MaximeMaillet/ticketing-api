module.exports = {
  post,
};

const provider = require('../services/provider');

async function post(req, res) {
  const {body} = req;
  console.log(body);

  try {
    await provider.postIssue(body.title, body.description);
  } catch(e) {
    console.log('contr')
    console.log(e);
  }

  res.send('ok');
}