const fs = require('fs');
const path = require('path');

const rootFolder = "../../../../../../";
const wpConfig = path.join(__dirname, rootFolder, "wp-config.php");

fs.readFile(wpConfig, "utf8", (err, data) => {
    if(err) {
        return console.log(err)
    };

  const result = data.replace(/true/g, "false");

  fs.writeFile(wpConfig, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});