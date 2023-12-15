const fs = require('fs');
const path = 'input.txt';
const input = fs.readFileSync(path, 'utf8');
const inputArray = input.trim().split(',');

const hash = (char, prev) => ((prev + char.charCodeAt(0)) * 17) % 256;

const hashStr = (string) => {
  let value = 0;
  for (const char of string) value = hash(char, value);
  return value;
};

const removeEl = (array, removeIndex) => {
  if (removeIndex === 0) array.shift();
  else if (removeIndex === array.length - 1) array.pop();
  else array = array.slice(0, removeIndex).concat(array.slice(removeIndex + 1));
  return array;
};

const part1 = () => {
  return inputArray.map((el) => hashStr(el)).reduce((a, b) => a + b, 0);
  // let sum = 0;
  // for (const string of inputArray) sum += hashStr(string);
  // return sum;
};

const part2 = () => {
  const boxes = new Array(256);

  const checkSlotIndex = (boxIndex, key) => {
    const checkBox = boxes[boxIndex];
    if (checkBox && checkBox.length > 0) {
      for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i][0] === key) return i;
      }
    }
  };

  for (const string of inputArray) {
    let signIndex =
      string.indexOf('=') !== -1 ? string.indexOf('=') : string.indexOf('-');

    let key = string.substring(0, signIndex);
    let value = Number(string.substring(signIndex + 1));

    let boxIndex = hashStr(key);

    let slotIndex = checkSlotIndex(boxIndex, key);

    // value is 0(-) && boxes[boxIndex] has same key
    if (value === 0 && slotIndex > -1) {
      // delete [key, value]
      boxes[boxIndex] = removeEl(boxes[boxIndex], slotIndex);
    }
    // value is bigger than 0 (=)
    if (value > 0) {
      // boxes[boxIndex] has same key
      if (slotIndex > -1) {
        // update value
        boxes[boxIndex][slotIndex][1] = value;
      }
      // boxes[boxIndex] does not have same key
      else {
        // insert [key, value]
        if (boxes[boxIndex] && boxes[boxIndex].length > 0) {
          boxes[boxIndex].push([key, value]);
        } else {
          boxes[boxIndex] = [[key, value]];
        }
      }
    }
  }

  // Get sum
  let totalSum = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i] && boxes[i].length > 0) {
      let boxSum = 0;
      for (let j = 0; j < boxes[i].length; j++) {
        boxSum += (j + 1) * boxes[i][j][1];
      }
      totalSum += (i + 1) * boxSum;
    }
  }

  return totalSum;
};

console.log('part1 answer: ', part1());
console.log('part2 answer: ', part2());
