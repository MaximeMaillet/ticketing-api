const inquirer = require('inquirer');
const {write, read} = require('./config');

async function run() {
  try {
    const response = await inquirer.prompt([{
      type: 'list',
      name: 'provider',
      message: 'Choose your provider',
      choices: [
        'Gitlab', 'Github'
      ]
    }]);
    const cli = require(`./providers/${response.provider}`);
    const configs = await read({provider: response.provider});
    if(configs.length > 0) {
      const supports = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Choose your support',
        choices: configs.map(item => item.name).concat(['New']),
      }]);

      if(supports.id !== 'New') {
        const credentials = configs.filter(item => item.name === supports.id)[0];
        if(credentials.project) {
          console.log(`Project Id #${credentials.project}`);
          const confirm = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Change project ?',
            default: 'N'
          }]);

          if(!confirm.confirm) {
            process.exit();
          }
        }

        await cli.connect(credentials);
        const projects = await cli.getProjects(credentials);
        const project = await askProject(projects);
        await write({
          ...credentials,
          project: project.project,
        });
        process.exit();
      }
    }

    const {credentials, projects} = await cli.init();
    const project = askProject(projects);

    await write({
      ...response,
      ...credentials,
      projectId: project.project,
    }, true);
  } catch(e) {
    console.error(e);
  }
}

async function askProject(projects) {
  return inquirer.prompt([{
    type: 'list',
    name: 'project',
    message: 'Choose your project',
    choices: projects.map((project) => {
      return {
        name: project.name,
        value: project.id,
      };
    })
  }]);
}

run();