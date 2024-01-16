const path = require('path');
const fs = require('fs');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

let rl = readline.createInterface(process.stdin, process.stdout);
rl.on('SIGINT', () => {
  rl.write('Как-то резко вы сорвались. Заходите еще.');
  append('Пользователь вышел по Ctrl+C');
  rl.close();
});

rl.write('Что имеете сказать?\n');
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.write('Заходите еще.');
    append('Пользователь вышел по exit');
    rl.close();
  } else {
    console.log('Очень интересно, продолжайте');
    append(`${input}\n`);
  }
});

function append(text) {
  fs.appendFile(filePath, text, (err) => {
    if (err) throw err;
  });
}
