const path = require('path');
const fse = require('fs-extra');

const rootFolder = '../../';
const dirTempImg = path.join(__dirname, rootFolder, '/temp_img/');
const dirImg = path.join(__dirname, rootFolder, '/img/');

// console.log(moveImgFile)

// const wpConfig = path.join(__dirname, rootFolder, 'move-img.js');

fse.move(dirTempImg, dirImg, (err) => {
  if (err) return console.log(err);
  console.log('Image files moved from temp_img to img folder!');
});


// rimraf(dirTempImg, () => console.log('done'));
