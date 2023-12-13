const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');

const timeString = input.match(/Time:\s+(.+)/);
const distanceString = input.match(/Distance:\s+(.+)/);

const timeArray = timeString[1].split(/\s+/).map(Number);
const distanceArray = distanceString[1].split(/\s+/).map(Number);

const part1 = () => {
  const res = [];
  for (const [i, t] of timeArray.entries()) {
    const options = [];

    for (let j = 1; j < t; j++) {
      let opt = j * (t - j);
      if (opt > distanceArray[i]) options.push(j * (t - j));
    }
    res.push(options.length);
  }
  let multiple = 1;
  for (const o of res) {
    multiple *= o;
  }
  return multiple;
};

const part2 = () => {
  const time = +timeArray.join('');
  const distance = +distanceArray.join('');
  let l;
  let r;
  for (let i = 0; i < time; i++) {
    if (i * (time - i) > distance) {
      l = i;
      break;
    }
  }
  for (let i = time; i >= 0; i--) {
    if (i * (time - i) > distance) {
      r = i;
      break;
    }
  }
  return r - (l - 1);
};

console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
