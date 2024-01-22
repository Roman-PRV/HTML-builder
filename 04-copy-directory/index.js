const fs = require('fs');
const path = require('path');

const srcFolderPath = path.join(__dirname, 'files');
const dstFolderPath = path.join(__dirname, 'files-copy');

fs.access(dstFolderPath, fs.constants.F_OK, (err) => {
  if (err) {
    copyFiles(srcFolderPath, dstFolderPath);
  } else {
    fs.rm(dstFolderPath, { recursive: true, force: true }, (err) => {
      if (err) throw err;
      else {
        copyFiles(srcFolderPath, dstFolderPath);
      }
    });
  }
});

function copyFiles(srcFolderPath, dstFolderPath) {
  fs.mkdir(dstFolderPath, { recursive: true }, (err) => {
    if (err) throw err;
    else {
      fs.readdir(srcFolderPath, (err, files) => {
        if (err) console.log(err);
        else {
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
      });
    }
  });
}
