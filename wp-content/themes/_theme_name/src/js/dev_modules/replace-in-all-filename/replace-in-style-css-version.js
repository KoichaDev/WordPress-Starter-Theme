const path = require('path');
const replace = require('replace-in-file');
const info = require('../../../../package.json');
const themeFolder = './../../../../';

const prefixCSSVersion = path.join(__dirname, themeFolder, 'style.css');

const options = {
  files: prefixCSSVersion,
  from: /_theme_name_version/g,
  to: info.version,
};

replace(options)
  .then((results) => {
    console.log('Replacement results:', results);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
