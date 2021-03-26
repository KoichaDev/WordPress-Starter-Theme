const fs = require('fs');
const compress_images = require('compress-images');
const INPUT_path_to_your_images = 'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif, webp}';
const OUTPUT_path = 'src/temp_img/';

const dirTempImg = 'src/temp_img/';

if (!fs.existsSync(dirTempImg)) {
  fs.mkdirSync(dirTempImg);
}

compress_images(
  INPUT_path_to_your_images,
  OUTPUT_path,
  { compress_force: true, statistic: true, autoupdate: true, pathLog: '' },
  false,
  { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
  { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
  { svg: { engine: 'svgo', command: '--multipass' } },
  { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },

  function (err, completed, statistic) {
    if (err === null) {
      fs.unlink(statistic.input, (err) => {
        if (err) throw err;
        console.log('successfully compressed and deleted ' + statistic.input);
      });
    }

    console.log(`Successfully compressed: ${completed}`);
  }
);


// rimraf(dirTempImg, () => console.log('done'));
