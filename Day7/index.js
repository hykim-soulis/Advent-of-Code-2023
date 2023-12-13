const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');
const games = input
  .split('\n')
  .slice(0, -1)
  .map((game) => game.replace('\r', '').split(' '));

const checkTypes1 = (game) => {
  let hand = game[0].split('').map((h) => cards1[h]);
  hand.sort((a, b) => a - b);
  const handObj = {};
  for (let i = 0; i < hand.length; i++) {
    handObj[hand[i]] = handObj[hand[i]] ? handObj[hand[i]] + 1 : 1;
  }
  let len = Object.entries(handObj).length;
  if (len === 5) {
    game.push(1);
  } else if (len === 4) {
    game.push(2);
  } else if (len === 1) {
    game.push(7);
  } else if (len === 3) {
    const values = Object.values(handObj).sort((a, b) => a - b);
    if (values[2] == 3) {
      game.push(4);
    } else if (values[2] == 2) {
      game.push(3);
    }
  } else if (len === 2) {
    const values = Object.values(handObj).sort((a, b) => a - b);
    if (values[0] == 1) {
      game.push(6);
    } else if (values[0] == 2) {
      game.push(5);
    }
  }
  return game;
};
const cards1 = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const compare1 = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (cards1[a[i]] < cards1[b[i]]) {
      return -1;
    } else if (cards1[a[i]] > cards1[b[i]]) {
      return 1;
    }
  }
  return 1;
};

const part1 = (games) => {
  for (let i = 0; i < games.length; i++) {
    checkTypes1(games[i]);
  }

  games.sort((a, b) => {
    if (a[2] > b[2]) {
      return 1;
    } else if (a[2] < b[2]) {
      return -1;
    } else {
      return compare1(a[0], b[0]);
    }
  });

  let sum = 0;

  for (let i = 0; i < games.length; i++) {
    sum += (i + 1) * Number(games[i][1]);
  }
  return sum;
};

const types = {
  'five of a kind': 7, // 1
  'four of a kind': 6, // 2
  'full house': 5, // 2
  'three of a kind': 4, // 3
  'two pair': 3, // 3
  'one pair': 2, // 4
  'high card': 1, // 5
};

const checkTypes2 = (game) => {
  let hand = game[0].split('').map((h) => cards2[h]);
  hand.sort((a, b) => a - b);
  const handObj2 = {};
  let numOfJ = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i] === 1) numOfJ++;
    else handObj2[hand[i]] = handObj2[hand[i]] ? handObj2[hand[i]] + 1 : 1;
  }

  let len = Object.entries(handObj2).length;
  if (numOfJ === 0) {
    if (len === 5) {
      game.push(1);
    } else if (len === 4) {
      game.push(2);
    } else if (len === 1) {
      game.push(7);
    } else if (len === 3) {
      const values = Object.values(handObj2).sort((a, b) => a - b);
      if (values[2] == 3) {
        game.push(4);
      } else if (values[2] == 2) {
        game.push(3);
      }
    } else if (len === 2) {
      const values = Object.values(handObj2).sort((a, b) => a - b);
      if (values[0] == 1) {
        game.push(6);
      } else if (values[0] == 2) {
        game.push(5);
      }
    }
  } else {
    if (numOfJ == 5 || numOfJ == 4) {
      game.push(7);
    } else if (numOfJ == 3) {
      const values = Object.values(handObj2).sort((a, b) => a - b);
      if (values.length == 2) {
        game.push(6);
      } else if (values.length == 1) {
        game.push(7);
      }
    } else if (numOfJ == 2) {
      const values = Object.values(handObj2).sort((a, b) => a - b);
      if (values.length == 3) {
        game.push(4);
      } else if (values.length == 2) {
        game.push(6);
      } else if (values.length == 1) {
        game.push(7);
      }
    } else if (numOfJ == 1) {
      const values = Object.values(handObj2).sort((a, b) => a - b);
      if (values.length == 4) {
        game.push(2);
      } else if (values.length == 3) {
        game.push(4);
      } else if (values.length == 2) {
        if (values[0] == 2) {
          game.push(5);
        } else if (values[0] == 1) {
          game.push(6);
        }
      } else if (values.length == 1) {
        game.push(7);
      }
    }
  }
  return game;
};
const cards2 = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const compare2 = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (cards2[a[i]] < cards2[b[i]]) {
      return -1;
    } else if (cards2[a[i]] > cards2[b[i]]) {
      return 1;
    }
  }
  return 1;
};

const part2 = (games) => {
  for (let i = 0; i < games.length; i++) {
    checkTypes2(games[i]);
  }

  games.sort((a, b) => {
    if (a[3] > b[3]) {
      return 1;
    } else if (a[3] < b[3]) {
      return -1;
    } else {
      return compare2(a[0], b[0]);
    }
  });

  let sum = 0;

  for (let i = 0; i < games.length; i++) {
    sum += (i + 1) * Number(games[i][1]);
  }

  return sum;
};

console.log('Part1 answer: ', part1([...games]));
console.log('Part2 answer: ', part2([...games]));
