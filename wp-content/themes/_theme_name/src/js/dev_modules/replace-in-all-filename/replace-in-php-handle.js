const path = require('path');
const replace = require('replace-in-file');
const info = require('../../../../package.json');
const themeFolder = './../../../../';

const prefixPHPHandle = path.join(__dirname, themeFolder, '**/*.php');

const options = {
  files: prefixPHPHandle,
  from: /_theme_name/g,
  to: info.name,
};

replace(options)
  .then((results) => {
    console.log('Replacement results:', results);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
