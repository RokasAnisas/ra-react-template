/* eslint-disable no-console */
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

// Configs
const config = {
  outDir: path.resolve(__dirname, '../src/'),
  consoleColor: {
    success: '\x1b[32m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
  },
};
const componentType = {
  component: 'components',
  layout: 'layouts',
  container: 'containers',
  view: 'views',
};

// State
let TYPE = '';

// Functions
const PromptType = async () => {
  await prompts({
    type: 'select',
    name: 'type',
    message: 'Choose type',
    choices: [
      {
        title: 'Component',
        description: 'Simple UI component',
        value: componentType.component,
      },
      {
        title: 'Layout',
        description: 'Layout UI component',
        value: componentType.layout,
      },
      {
        title: 'Container',
        description: 'State component',
        value: componentType.container,
      },
      {
        title: 'View',
        description: 'View component',
        value: componentType.view,
      },
    ],
    initial: 0,
  }).then(value => {
    TYPE = value.type;
    PromptName();
  });
};

// const GeneratePrompt = async () => {
//   await prompts({
//     type: 'text',
//     name: 'name',
//     message: 'Enter component name:',
//     // validate: value => (value < 18 ? `Nightclub is 18+ only` : true),
//   }).then(result => {
//     checkIfComponentExists(result.name).then(exists => {
//       if (exists) {
//         console.log(config.consoleColor.error, 'file exists');
//         GeneratePrompt();
//       } else {
//         console.log('Yay!');
//       }
//     });
//   });
// };

const PromptName = async () => {
  await prompts({
    type: 'text',
    name: 'name',
    message: 'Enter component name:',
    // validate: value => (value < 18 ? `Nightclub is 18+ only` : true),
  }).then(value => {
    checkIfComponentExists(value.name, TYPE).then(exists => {
      if (exists) {
        console.log(config.consoleColor.error, `${value.name} exists`);
        PromptName();
      } else {
        console.log('Yay!');
      }
    });
  });
};

const checkIfComponentExists = async (name, subdir) => {
  return fs.existsSync(`${config.outDir}/${subdir}/${name}`);
};

// Init script
// GeneratePrompt();
PromptType();