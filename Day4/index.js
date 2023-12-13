const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');

const part1 = () => {
  const games = input.split('\n').slice(0, -1);
  for (let i = 0; i < games.length; i++) {
    let startIndex = games[i].indexOf(':');
    games[i] = games[i]
      .slice(startIndex + 2, games.length - 1)
      .replaceAll('\r', '')
      .split(' | ');
  }
  for (let i = 0; i < games.length; i++) {
    let l1 = (games[i][0].length + 1) / 3;
    let l2 = (games[i][1].length + 1) / 3;
    let num1 = [];
    let num2 = [];
    for (let j = 0; j < l1; j++) {
      num1.push(Number(games[i][0].substring(j * 3, j * 3 + 2)));
    }
    for (let k = 0; k < l2; k++) {
      num2.push(Number(games[i][1].substring(k * 3, k * 3 + 2)));
    }

    games[i] = [num1, num2];
  }

  let sum = 0;
  for (const game of games) {
    let count = 0;
    for (let i = 0; i < game[0].length; i++) {
      if (game[1].indexOf(game[0][i]) !== -1) {
        count += 1;
      }
    }
    if (count > 0) {
      sum += Math.pow(2, count - 1);
    }
  }

  return sum;
};

const part2 = () => {
  const games = input.split('\n').slice(0, -1);

  for (let i = 0; i < games.length; i++) {
    let startIndex = games[i].indexOf(':');
    games[i] = games[i]
      .slice(startIndex + 2, games.length - 1)
      .replaceAll('\r', '')
      .split(' | ');
  }

  for (let i = 0; i < games.length; i++) {
    let l1 = (games[i][0].length + 1) / 3;
    let l2 = (games[i][1].length + 1) / 3;
    let num1 = [];
    let num2 = [];
    for (let j = 0; j < l1; j++) {
      num1.push(Number(games[i][0].substring(j * 3, j * 3 + 2)));
    }
    for (let k = 0; k < l2; k++) {
      num2.push(Number(games[i][1].substring(k * 3, k * 3 + 2)));
    }

    games[i] = [num1, num2];
  }

  let sum = [];
  for (const game of games) {
    let count = 0;
    for (let i = 0; i < game[0].length; i++) {
      if (game[1].indexOf(game[0][i]) !== -1) {
        count += 1;
      }
    }
    sum.push(count);
  }

  let res = new Array(games.length).fill(1);

  for (let i = 0; i < sum.length; i++) {
    if (sum[i] > 0) {
      for (let j = i + 1; j <= Math.min(sum.length - 1, i + sum[i]); j++) {
        res[j] = res[j] + res[i];
      }
    }
  }

  let ans = 0;
  for (const r of res) {
    ans += r;
  }
  return ans;
};

console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
