const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) console.log(err);
  else handleFiles(files);
});

function handleFiles(files) {
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (stats.isFile()) {
        const fileParse = path.parse(file);
        console.log(
          `${fileParse.name} - ${fileParse.ext.slice(1)} - ${stats.size}B`,
        );
      }
    });
  });
}
