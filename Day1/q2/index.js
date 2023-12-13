const fs = require('fs');

const filePath = 'calibration.txt';

const getFirstAndLastDigit = (text) => {
  let txt = text;
  txt = txt.replaceAll('one', 'one1one');
  txt = txt.replaceAll('two', 'two2two');
  txt = txt.replaceAll('three', 'three3three');
  txt = txt.replaceAll('four', 'four4four');
  txt = txt.replaceAll('five', 'five5five');
  txt = txt.replaceAll('six', 'six6six');
  txt = txt.replaceAll('seven', 'seven7seven');
  txt = txt.replaceAll('eight', 'eight8eight');
  txt = txt.replaceAll('nine', 'nine9nine');

  let regex = /[0-9]/g;
  const found = txt.match(regex);
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

  console.log('answer is ', sum, ' n of rows: ', arr.length - 1);
} catch (error) {
  console.error('Error reading file:', error.message);
}
