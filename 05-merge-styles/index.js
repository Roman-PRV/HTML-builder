const fs = require('fs');
const path = require('path');

// const util = require('util');
// const appendFile = util.promisify(fs.appendFile);

const srcFolderPath = path.join(__dirname, 'styles');
const dstFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

// create bundle file
fs.writeFile(dstFilePath, '', (err) => {
  if (err) throw err;
});

fs.readdir(srcFolderPath, (err, files) => {
  if (err) console.log(err);
  else {
    filesCSS = files.filter((file) => path.extname(file) === '.css');
    filesCSS.forEach((file) => {
      fs.readFile(path.join(srcFolderPath, file), 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          fs.appendFile(dstFilePath, data, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    });
  }
});
