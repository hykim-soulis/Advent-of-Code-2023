const { createPublicKey } = require('crypto');
const fs = require('fs');

const filePath = 'input.txt';
const input = fs.readFileSync(filePath, 'utf-8');
const schematics = input
  .split('\n')
  .slice(0, -1)
  .map((row) => row.replace('\r', ''));
const numberArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const regex = /[0-9]+/g;
const numbersMap = new Map();
const numbersIndexMap = new Map();
const symbols = new Map();
const stars = new Map();

for (let i = 0; i < schematics.length; i++) {
  const index = [];
  while (regex.test(schematics[i])) index.push(regex.lastIndex);
  if (index.length > 0) numbersIndexMap.set(i, index);
  numbersMap.set(i, schematics[i].match(regex));
}

for (let i = 0; i < schematics.length; i++) {
  const index = [];
  const starIndex = [];
  for (let j = 0; j < schematics[i].length; j++) {
    if (numberArray.indexOf(schematics[i][j]) == -1 && schematics[i][j] !== '.')
      index.push(j);
    if (schematics[i][j] === '*') {
      starIndex.push(j);
    }
  }
  if (index.length > 0) symbols.set(i, index);
  if (starIndex.length > 0) stars.set(i, starIndex);
}

const part1 = () => {
  const checkIt = (row, col, checkArray) => {
    if (
      row < 0 ||
      row >= schematics.length ||
      col < 0 ||
      col >= schematics[row].length
    )
      return;
    if (symbols.has(row) && symbols.get(row).indexOf(col) !== -1) {
      checkArray.push(true);
    } else {
      checkArray.push(false);
    }
  };
  const checkLeft = (row, col, checkArr) => {
    checkIt(row, col - 1, checkArr);
    checkMiddle(row, col - 1, checkArr);
    checkMiddle(row, col, checkArr);
  };
  const checkMiddle = (row, col, checkArr) => {
    checkIt(row + 1, col, checkArr);
    checkIt(row - 1, col, checkArr);
  };
  const checkRight = (row, col, checkArr) => {
    checkIt(row, col + 1, checkArr);
    checkMiddle(row, col + 1, checkArr);
    checkMiddle(row, col, checkArr);
  };
  const rows = numbersIndexMap.keys();

  const nums = [];

  const islands = [];

  for (const row of rows) {
    nums.push(...numbersMap.get(row));
    const numbers = numbersMap.get(row);
    const indexes = numbersIndexMap.get(row);
    for (let i = 0; i < numbers.length; i++) {
      let leng = numbers[i].length;
      let checkArr = [];
      if (leng === 1) {
        checkLeft(row, indexes[i] - 1, checkArr);
        checkRight(row, indexes[i] - 1, checkArr);
        // console.log('😊😊😊😊😊😊', row, indexes[i]);
      } else if (leng === 2) {
        checkLeft(row, indexes[i] - 2, checkArr);
        checkRight(row, indexes[i] - 1, checkArr);
      } else if (leng === 3) {
        checkLeft(row, indexes[i] - 3, checkArr);
        checkMiddle(row, indexes[i] - 2, checkArr);
        checkRight(row, indexes[i] - 1, checkArr);
      }
      if (checkArr.every((el) => el === false)) {
        islands.push(Number(numbers[i]));
      }
    }
  }

  const total = nums.map(Number).reduce((a, b) => a + b, 0);

  return total - islands.reduce((a, b) => a + b, 0);
};

const checkLeft = (row, col, array) => {
  if (col - 1 < 0) return;

  let left = schematics[row][col - 1];
  if (numberArray.indexOf(left) > -1) {
    array.unshift(left);
    return checkLeft(row, col - 1, array);
  } else {
    return array;
  }
};

const checkRight = (row, col, array) => {
  if (col + 1 >= schematics[row].length) return;

  let right = schematics[row][col + 1];
  if (numberArray.indexOf(right) > -1) {
    array.push(right);
    return checkRight(row, col + 1, array);
  } else {
    return array;
  }
};

const part2 = () => {
  let resultArr = [];

  const rows = stars.keys();
  for (const row of rows) {
    const cols = stars.get(row);
    for (const col of cols) {
      const adjacent = [];
      const getNumberFromArray = (numArray) => {
        if (numArray.length > 0) adjacent.push(Number(numArray.join('')));
      };

      getNumberFromArray(checkLeft(row, col, []));
      getNumberFromArray(checkRight(row, col, []));

      const parseString = (string) => {
        const regex = /[0-9]+/g;

        const indexes = [];
        while (regex.test(string)) indexes.push(regex.lastIndex - 1);

        const nums = string.match(regex);
        for (let i = 0; i < indexes.length; i++) {
          indexes[i] = [indexes[i] - nums[i].length + 1, indexes[i]];
        }

        if (indexes.length > 0) {
          for (let i = 0; i < indexes.length; i++) {
            if (!(indexes[i][1] < 2 || indexes[i][0] > 4)) {
              adjacent.push(Number(nums[i]));
            }
          }
        }
      };

      const topStr = schematics[row - 1].slice(col - 3, col + 4);
      const bottomStr = schematics[row + 1].slice(col - 3, col + 4);

      parseString(topStr);
      parseString(bottomStr);
      if (adjacent.length > 0)
        if (adjacent.length === 2) resultArr.push([adjacent[0], adjacent[1]]);
    }
  }

  return resultArr.map((a) => a[0] * a[1]).reduce((a, b) => a + b, 0);
};

console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
