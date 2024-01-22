const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const srcFolderPath = path.join(__dirname, 'styles');
const styleDstFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStylesByOrden(fileArray, outputFile) {
  await fsp.writeFile(outputFile, '');
  for (let i = 0; i < fileArray.length; i++) {
    const data = await fsp.readFile(fileArray[i], 'utf8');
    await fsp.writeFile(outputFile, data, { flag: 'a' });
  }
}

fs.readdir(srcFolderPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    const fullPathFiles = files
      .filter((file) => path.extname(file.toLowerCase()) === '.css')
      .map((file) => path.join(srcFolderPath, file));
    mergeStylesByOrden(fullPathFiles, styleDstFile)
      .then(() => console.log('+ CSS style has been merged'))
      .catch(console.error);
  }
});
