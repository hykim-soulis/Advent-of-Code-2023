const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');
const games = input
  .split('\n')
  .slice(0, -1)
  .map((g) => g.replace('\r', '').split(' '))
  .map((game) => game.map((g) => Number(g)));

const getDiffLast = (array) => {
  const newArr = [];
  for (let i = 1; i < array.length; i++) {
    newArr.push(array[i] - array[i - 1]);
  }
  if (newArr.every((el) => el === 0)) {
    return array[array.length - 1] + newArr[newArr.length - 1];
  } else {
    return array[array.length - 1] + getDiffLast(newArr);
  }
};
const getDiffFirst = (array) => {
  const newArr = [];
  for (let i = 1; i < array.length; i++) {
    newArr.push(array[i] - array[i - 1]);
  }
  if (newArr.every((el) => el === 0)) {
    return array[0] - newArr[0];
  } else {
    return array[0] - getDiffFirst(newArr);
  }
};

const part1 = () => {
  const res = [];
  for (let i = 0; i < games.length; i++) {
    let result = getDiffLast(games[i]);
    res.push(result);
  }

  return res.reduce((a, b) => a + b, 0);
};
const part2 = () => {
  const res = [];
  for (let i = 0; i < games.length; i++) {
    let result = getDiffFirst(games[i]);
    res.push(result);
  }

  return res.reduce((a, b) => a + b, 0);
};

console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
