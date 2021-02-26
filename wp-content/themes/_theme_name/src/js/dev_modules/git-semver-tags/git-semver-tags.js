const gitSemverTags = require('git-semver-tags');
const path = require('path');
const replace = require('replace-in-file');
const info = require('../../../../package.json');
const themeFolder = './../../../../';

const version = path.join(__dirname, themeFolder, 'package.json');

gitSemverTags((err, tag) => {
  // 1. /v match character 'v'
  // 2. \d Matches any digit character (0-9)
  // 3. + match 1 or more of the preceding token
  // 4. (?:\.\d+) Non-capturing Group: Groups multiple token together without createing a capture group
  // 5. \. Escaped Character. Matches "." character (char code 46)
  // 6. \d Matches any digit character (0-9)
  // 7. Quantifier. Match 1 or more of the preceding token
  // 8. * Match 0 or more of the preceding token
  // 9. /g global search. Retain the index of the last match, allowing iterative searches
  // 10. substr(1) removes the first index position of the string.

  const tagVersion = tag[0].match(/v\d+(?:\.\d+)*/g)[0].substr(1);
  const packageVersionValue = info.version;

  const options = {
    files: version,
    from: packageVersionValue,
    to: tagVersion,
  };

  replace(options)
    .then((results) => {
      console.log('Replacement result:', results);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
});
