const fs = require('fs');
const path = require('path');

const srcFolderPath = path.join(__dirname, 'files');
const dstFolderPath = path.join(__dirname, 'files-copy');

fs.access(dstFolderPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dstFolderPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(srcFolderPath, (err, files) => {
  if (err) console.log(err);
  else copyFiles(srcFolderPath, dstFolderPath, files);
});

function copyFiles(srcFolderPath, dstFolderPath, files) {
  files.forEach((file) => {
    fs.copyFile(
      path.join(srcFolderPath, file),
      path.join(dstFolderPath, file),
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
  });
}
