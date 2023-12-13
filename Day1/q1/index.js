const fs = require('fs');

const filePath = 'calibration.txt';

const getFirstAndLastDigit = (text) => {
  let regex = /[1-9]/g;
  const found = text.match(regex);
  const value = Number(found[0]) * 10 + Number(found[found.length - 1]);
  return value;
};
try {
  const text = fs.readFileSync(filePath, 'utf-8');
  const arr = text.split('\n');

  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let value = getFirstAndLastDigit(arr[i]);
    sum += value;
  }

  console.log('answer is ', sum);
} catch (error) {
  console.error('Error reading file:', error.message);
}
