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
    for (let j = 0; j < arr[i].length; j++) {
      if (
        (arr[i][j][0] == 'blue' && arr[i][j][1] > 14) ||
        (arr[i][j][0] == 'green' && arr[i][j][1] > 13) ||
        (arr[i][j][0] == 'red' && arr[i][j][1] > 12)
      ) {
        res.push(i + 1);
        break;
      }
    }
  }

  let totalGames = arr.length - 1;
  let sum = 0;
  for (let i = 0; i < res.length; i++) {
    sum += res[i];
  }
  let totalSum = (totalGames * (totalGames + 1)) / 2;
  console.log('answer is ', totalSum - sum);
} catch (error) {
  console.error('Error reading file:', error.message);
}
