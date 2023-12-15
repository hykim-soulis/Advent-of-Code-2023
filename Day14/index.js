const fs = require('fs');
const path = 'input.txt';
const input = fs.readFileSync(path, 'utf8');
const platform = input.split('\r\n').slice(0, -1);
console.log(platform.length === platform[0].length);

const numCol = platform[0].length;
const getVerticalRocks = (platform, rock) => {
  const rocks = new Map();
  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === rock) {
        if (rocks.get(j)) rocks.get(j).push(i);
        else rocks.set(j, [i]);
      }
    }
  }
  return rocks;
};
const getHorigontalRocks = (platform, rock) => {
  const rocks = new Map();

  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === rock) {
        if (rocks.get(i)) rocks.get(i).push(j);
        else rocks.set(i, [j]);
      }
    }
  }
  return rocks;
};
const squaresVer = getVerticalRocks(platform, '#');
const squaresHor = getHorigontalRocks(platform, '#');

const rollNorthWest = (rounds, squares) => {
  let r = 0;
  let s = 0;
  let p = 0;
  // console.log('s: ', s, squares);
  if (!squares) {
    p = 0;
  } else {
    while (squares[s] <= p) {
      p += 1;
      s += 1;
    }
  }
  s = 0;
  const roll = [];
  while (rounds && r < rounds.length) {
    if (!squares || rounds[r] < squares[s] || s >= squares.length) {
      roll.push(p);
      p += 1;
      r += 1;
    } else {
      p = squares[s] + 1;
      s += 1;
    }
  }
  return roll;
};

const rollSouthEast = (rounds, squares) => {
  if (!rounds) return;
  let r = rounds.length - 1;
  let s;
  let p = platform.length - 1;
  if (squares) {
    s = squares.length - 1;
    while (squares[s] > p) {
      p -= 1;
      s -= 1;
    }
    s = squares.length - 1;
  }

  const roll = new Array(rounds.length);
  while (r >= 0) {
    if (!squares || rounds[r] > squares[s] || s < 0) {
      roll[r] = p;
      p -= 1;
      r -= 1;
    } else {
      p = squares[s] - 1;
      s -= 1;
    }
  }
  return roll;
};

const rounds = getVerticalRocks(platform, 'O');
const getNorthSupport = (horMap) => {
  let sum = 0;
  for (const key of horMap.keys()) {
    sum += (numCol - key) * horMap.get(key).length;
  }
  return sum;
};
const part1 = (rounds, squares) => {
  // let result = 0;
  // for (let i = 0; i < numCol; i++) {
  //   if (rounds.get(i)) {
  //     const res = rollNorthWest(rounds.get(i), squares.get(i));
  //     result += numCol * res.length - res.reduce((a, b) => a + b, 0);
  //   }
  // }
  // return result;
  for (let r = 0; r < numCol; r++) {
    if (rounds.get(r)) {
      const res = rollNorthWest(rounds.get(r), squares.get(r));
      rounds.set(r, res);
    }
  }
  let roundsHor = convertRounds(rounds);
  return getNorthSupport(roundsHor);
};

const convertRounds = (map) => {
  const converted = new Map();
  for (const key of map.keys()) {
    for (const v of map.get(key)) {
      if (converted.get(v)) converted.get(v).push(key);
      else converted.set(v, [key]);
    }
  }
  for (const key of converted.keys()) {
    converted.get(key).sort((a, b) => a - b);
  }
  return converted;
};

const part2 = () => {
  let roundsVer = getVerticalRocks(platform, 'O');
  // console.log('start', convertRounds(roundsVer));
  // console.log('--------------------');
  const cycle = (roundsVer) => {
    for (let r = 0; r < numCol; r++) {
      if (roundsVer.get(r)) {
        const res = rollNorthWest(roundsVer.get(r), squaresVer.get(r));
        roundsVer.set(r, res);
      }
    }
    let roundsHor = convertRounds(roundsVer);
    // console.log('after north roll', roundsHor);
    // console.log('--------------------');
    for (let r = 0; r < numCol; r++) {
      if (roundsHor.get(r)) {
        const res = rollNorthWest(roundsHor.get(r), squaresHor.get(r));
        roundsHor.set(r, res);
      }
    }
    // console.log('after west roll', roundsHor);
    // console.log('--------------------');

    roundsVer = convertRounds(roundsHor);
    for (let r = 0; r < numCol; r++) {
      if (roundsVer.get(r)) {
        const res = rollSouthEast(roundsVer.get(r), squaresVer.get(r));
        roundsVer.set(r, res);
      }
    }

    roundsHor = convertRounds(roundsVer);
    // console.log('after south roll', roundsHor);
    // console.log('--------------------');

    for (let r = 0; r < numCol; r++) {
      if (roundsHor.get(r)) {
        const res = rollSouthEast(roundsHor.get(r), squaresHor.get(r));
        roundsHor.set(r, res);
      }
    }
    // console.log('after east roll', roundsHor);
    // console.log('--------------------');

    return convertRounds(roundsHor);
  };

  const answers = [];
  for (let i = 0; i < 200; i++) {
    roundsVer = cycle(roundsVer);
    let ans = getNorthSupport(convertRounds(roundsVer));
    answers.push(ans);
  }

  // console.log(answers.slice(0, 100));
  // console.log(answers.slice(100, 200));
  // console.log(answers.slice(200, 300));
  // console.log(answers.slice(300, 400));
  // console.log(answers.indexOf(104644));
  // console.log(answers.indexOf(104647));
  let firstRepeatingIndex = answers.indexOf(104644);
  let lastRepeatingIndex = answers.indexOf(104647);
  let repeatingArr = answers.slice(firstRepeatingIndex, lastRepeatingIndex + 1);
  let lengthOfRepeats = repeatingArr.length;

  let modular = (1000000000 - firstRepeatingIndex) % lengthOfRepeats;

  return answers[firstRepeatingIndex + modular - 1];
};
console.log('part1 answer is ', part1(rounds, squaresVer));
console.log('part2 answer is ', part2());
// [
//   102673, 102859, 102928, 102990, 102961, 102935, 102900, 102808, 102716,
//   102652, 102688, 102671, 102639, 102621, 102658, 102572, 102485, 102460,
//   102444, 102446, 102467, 102508, 102515, 102529, 102555, 102581, 102616,
//   102660, 102725, 102765, 102793, 102835, 102920, 102963, 102970, 102976,
//   102986, 102980, 102988, 102959, 102953, 102970, 102961, 102952, 102984,
//   102979, 102984, 102960, 102956, 102948, 102937, 102929, 102943, 102954,
//   102953, 102964, 103006, 103035, 103047, 103058, 103078, 103104, 103092,
//   103087, 103103, 103138, 103152, 103160, 103173, 103192, 103195, 103212,
//   103245, 103278, 103295, 103321, 103327, 103347, 103362, 103368, 103402,
//   103430, 103445, 103463, 103487, 103522, 103557, 103597, 103652, 103715,
//   103757, 103768, 103780, 103789, 103778, 103769, 103785, 103804, 103803,
//   103802,

//   103811, 103819, 103800, 103779, 103784, 103798, 103793, 103799, 103804,
//   103820, 103810, 103795, 103797, 103806, 103820, 103832, 103869, 103909,
//   103934, 103960, 104007, 104026, 104026, 104027, 104049, 104066, 104064,
//   104072, 104102, 104131, 104149, 104155, 104175, 104192, 104194, 104201,
//   104204, 104239, 104261, 104291, 104340, 104395, 104433, 104468, 104520,
//   104533, 104522, 104505, 104501, 104514, 104520, 104522, 104553, 104574,
//   104577, 104581, 104594, 104606, 104603, 104599, 104615, 104646, 104656,
//   104670, 104697, 104705, 104714, 104705, 104690, 104672,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635, 104640, 104651, 104625,
//   104620, 104626, 104646, 104642, 104633, 104644, 104632, 104627, 104619,
//   104639, 104649, 104640, 104637, 104625, 104634, 104626, 104632, 104642,
//   104647,

//   104644, 104618, 104627, 104633, 104639, 104635,
// ];
