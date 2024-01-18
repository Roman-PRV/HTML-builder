const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

// створити папку призначення для проекту
const dstFolderPath = path.join(__dirname, 'project-dist');
fs.access(dstFolderPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dstFolderPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
});

// ====================================COPY ASSETS========================================
const sourceDir = path.join(__dirname, 'assets');
const destDir = path.join(dstFolderPath, 'assets');

fs.cp(sourceDir, destDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('assets copied');
  }
});

// ====================================MERGE STYLES========================================

// мерджіть по черзі, щоб уникнути стану перегонів
async function mergeStylesByOrden(fileArray, outputFile) {
  await fsp.writeFile(outputFile, '');
  for (let i = 0; i < fileArray.length; i++) {
    const data = await fsp.readFile(fileArray[i], 'utf8');
    await fsp.writeFile(outputFile, data, { flag: 'a' });
  }
}

// читає усі файли стилів з папки styleFolder та мерджить їх
function mergeStyles(styleFolder, styleDstFile) {
  fs.readdir(styleFolder, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      fullPathFiles = files
        .filter((file) => path.extname(file.toLowerCase()) === '.css')
        .map((file) => path.join(styleFolder, file));
      mergeStylesByOrden(fullPathFiles, styleDstFile)
        .then(() => console.log('CSS styles merged'))
        .catch(console.error);
    }
  });
}

// ====================================INDEX.HTML========================================

// знайти усі теги в шаблоні
function findTags(template) {
  const regex = /{{(.*?)}}/g;
  let match;
  const tags = [];
  while ((match = regex.exec(template)) !== null) {
    tags.push(match[1]);
  }
  return tags;
}

// замінює теги по черзі, щоб уникнути стану перегонів
async function replaceTagsByOrden(tags, template, outputFile) {
  for (let i = 0; i < tags.length; i++) {
    const tag = path.join(__dirname, 'components', tags[i] + '.html');
    const data = await fsp.readFile(tag, 'utf8');
    template = template.replaceAll(`{{${tags[i]}}}`, data);
  }
  await fsp.writeFile(outputFile, template);
}

// сстворює index.html з заміною усіх тегіві на шаблони
function createIndex(templatePath, indexPath) {
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.log(err);
    } else {
      const tags = findTags(template);
      replaceTagsByOrden(tags, template, indexPath)
        .then(() => console.log('index.html merged'))
        .catch(console.error);
    }
  });
}

const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');
createIndex(templatePath, indexPath);

const styleFolder = path.join(__dirname, 'styles');
const styleDstFile = path.join(__dirname, 'project-dist', 'style.css');
mergeStyles(styleFolder, styleDstFile);
