const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');
const directionsInput = input.replace('\r', '').split('\n').slice(0, 1);
const directions = directionsInput[0]
  .replaceAll('L', 0)
  .replaceAll('R', 1)
  .split('')
  .map((d) => Number(d));
const nodeObj = {};
input
  .split('\n')
  .slice(2, -1)
  .map((node) => node.replace('\r', ''))
  .map((node) => {
    nodeObj[node.slice(0, 3)] = [node.slice(7, 10), node.slice(12, 15)];
  });

const part1 = () => {
  let step = 0;
  let index = 0;
  let prevKey = 'AAA';
  let prevNode = nodeObj[prevKey]; // 'AAA': [FKJ, QVX]

  while (prevKey !== 'ZZZ') {
    if (index >= directions.length) {
      index = index - directions.length;
    }
    let d = directions[index]; // 0
    prevKey = prevNode[d]; // FKJ
    prevNode = nodeObj[prevKey]; // [DMJ, BND]
    index += 1;
    step += 1;
  }
  return step;
};

const endsWithZ = (prevKey) => {
  let step = 0;
  let index = 0;

  let prevNode = nodeObj[prevKey]; // 'AAA': [FKJ, QVX]

  while (!prevKey.endsWith('Z')) {
    if (index >= directions.length) {
      index = index - directions.length;
    }
    let d = directions[index]; // 0
    prevKey = prevNode[d]; // FKJ
    prevNode = nodeObj[prevKey]; // [DMJ, BND]
    index += 1;
    step += 1;
  }
  return step;
};
function gcd(a, b) {
  for (let temp = b; b !== 0; ) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcmFunction(a, b) {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}

const part2 = () => {
  let steps = Object.keys(nodeObj)
    .filter((key) => key.endsWith('A'))
    .map((key) => endsWithZ(key));
  return steps.reduce((acc, key) => lcmFunction(acc, key), 1);
};
console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
