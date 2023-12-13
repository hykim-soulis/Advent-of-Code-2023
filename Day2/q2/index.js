const fs = require('fs');

const filePath = '../input.txt';

try {
  const text = fs.readFileSync(filePath, 'utf-8');
  const arr = text.split('\n');

  for (let i = 0; i < arr.length - 1; i++) {
    const start = arr[i].indexOf(':');
    arr[i] = arr[i].slice(start + 2);
    arr[i] = arr[i].replaceAll(', ', '; ').replace('\r', '').split('; ');

    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = arr[i][j].split(' ');
      let temp = arr[i][j][1];
      arr[i][j][1] = Number(arr[i][j][0]);
      arr[i][j][0] = temp;
    }
  }

  const res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    res[i] = [0, 0, 0]; // r g b
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j][0] == 'red') {
        res[i][0] = Math.max(arr[i][j][1], res[i][0]);
      } else if (arr[i][j][0] == 'green') {
        res[i][1] = Math.max(arr[i][j][1], res[i][1]);
      } else if (arr[i][j][0] == 'blue') {
        res[i][2] = Math.max(arr[i][j][1], res[i][2]);
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < res.length; i++) {
    sum += res[i][0] * res[i][1] * res[i][2];
  }

  console.log('answer is ', sum);
} catch (error) {
  console.error('Error reading file:', error.message);
}
