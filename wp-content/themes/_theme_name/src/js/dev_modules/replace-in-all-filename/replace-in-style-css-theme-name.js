const path = require('path');
const replace = require('replace-in-file');
const info = require('../../../../package.json');
const themeFolder = './../../../../';

const prefixCSSThemeName = path.join(__dirname, themeFolder, 'style.css');

const options = {
  files: prefixCSSThemeName,
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
