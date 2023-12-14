const fs = require('fs');
const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf8');

const mirrors = [];

let rows = [];
for (const text of input.split('\r\n')) {
  if (text !== '') rows.push(text);
  else {
    mirrors.push(rows);
    rows = [];
  }
}

const convertArray = (array) => {
  const tempArray = [];
  for (let i = 0; i < array.length; i++) tempArray.push(array[i].split(''));
  const newArray = [];
  for (let j = 0; j < tempArray[0].length; j++) {
    let newRow = [];
    for (let i = 0; i < tempArray.length; i++) newRow.push(tempArray[i][j]);
    newArray.push(newRow);
  }

  for (let i = 0; i < newArray.length; i++) newArray[i] = newArray[i].join('');
  return newArray;
};
const checkCandidates = (candidates, mirror) => {
  for (const cand of candidates) {
    let left = cand[0] - 1;
    let right = cand[1] + 1;
    const boolArray = [];
    while (left >= 0 && right < mirror.length) {
      if (mirror[left] !== mirror[right]) {
        boolArray.push(false);
      }
      left -= 1;
      right += 1;
    }
    if (boolArray.length === 0) return cand[0] + 1;
  }
};
const part1 = () => {
  const verticals = [];
  const horizontals = [];

  const getCandidates = (array) => {
    const candidates = [];
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] === array[i + 1]) candidates.push([i, i + 1]);
    }
    return candidates;
  };

  for (let i = 0; i < mirrors.length; i++) {
    let horCands = getCandidates(mirrors[i]);
    if (horCands.length > 0) {
      const res = checkCandidates(horCands, mirrors[i]);
      if (res) {
        horizontals.push(res);
      } else {
        const convertedArray = convertArray(mirrors[i]);
        let verCands = getCandidates(convertedArray);
        if (verCands.length > 0) {
          const res = checkCandidates(verCands, convertedArray);
          if (res) verticals.push(res);
        }
      }
    } else {
      const convertedArray = convertArray(mirrors[i]);
      let verCands = getCandidates(convertedArray);
      if (verCands.length > 0) {
        const res = checkCandidates(verCands, convertedArray);
        if (res) verticals.push(res);
      }
    }
  }
  // console.log('horizontals', horizontals.length, horizontals);
  // console.log('verticals', verticals.length, verticals);
  const horSum = horizontals.reduce((a, b) => a + b, 0);
  const verSum = verticals.reduce((a, b) => a + b, 0);
  return horSum * 100 + verSum;
};

const part2 = () => {
  const verticals = [];
  const horizontals = [];

  const checkCandidatesChangeOne = (candidates, mirror) => {
    for (const cand of candidates) {
      let left = cand[0] - 1;
      let right = cand[1] + 1;
      const checkArray = [];
      while (left >= 0 && right < mirror.length) {
        if (mirror[left] !== mirror[right]) {
          checkArray.push([left, right]);
        }
        left -= 1;
        right += 1;
      }
      // console.log(checkArray);
      if (checkArray.length === 1) {
        let wrongCount = 0;
        const wantToCheckIndex = checkArray[0];
        for (let i = 0; i < mirror[wantToCheckIndex[0]].length; i++) {
          if (
            mirror[wantToCheckIndex[0]][i] !== mirror[wantToCheckIndex[1]][i]
          ) {
            wrongCount += 1;
          }
        }
        if (wrongCount === 1) return cand[0] + 1;
      }
    }
  };
  const checkCandidatesPart2 = (candidates, mirror) => {
    const alreadyChangedCands = candidates.filter(
      (candidate) => candidate[2] === 0
    );
    const notYetChangedCands = candidates.filter(
      (candidate) => candidate[2] === 1
    );
    // console.log('alreadyChangedCands: ', alreadyChangedCands);
    // console.log('notYetChangedCands: ', notYetChangedCands);
    const resArr = [];
    if (alreadyChangedCands.length > 0) {
      // console.log('in al', checkCandidates(alreadyChangedCands, mirror));
      const res = checkCandidates(alreadyChangedCands, mirror);
      if (res) resArr.push(res);
    }
    if (notYetChangedCands.length > 0) {
      // console.log(
      //   'in notyet',
      //   checkCandidatesChangeOne(notYetChangedCands, mirror)
      // );
      const res = checkCandidatesChangeOne(notYetChangedCands, mirror);
      if (res) resArr.push(res);
    }
    // console.log('resArr: ', resArr);
    return resArr;
  };

  const getCandidates = (array) => {
    const candidates = [];
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] === array[i + 1]) {
        // console.log('i: ', i, array[i], 'i+1', i + 1, array[i + 1]);
        candidates.push([i, i + 1, 1]);
      } else {
        const boolArr = [];
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j] !== array[i + 1][j]) boolArr.push(false);
        }
        if (boolArr.length === 1) {
          candidates.push([i, i + 1, 0]);
        }
      }
    }
    return candidates;
  };

  for (let i = 0; i < mirrors.length; i++) {
    // console.log('i is ', i);

    let horCands = getCandidates(mirrors[i]);
    if (horCands.length > 0) {
      // console.log('horCands: ', horCands);
      const res = checkCandidatesPart2(horCands, mirrors[i]);
      // console.log('hor res is ', res);
      if (res) horizontals.push(...res);
    }

    const convertedArray = convertArray(mirrors[i]);
    let verCands = getCandidates(convertedArray);
    if (verCands.length > 0) {
      // console.log('verCands: ', verCands);
      const res = checkCandidatesPart2(verCands, convertedArray);
      // console.log('ver res is ', res);
      if (res) verticals.push(...res);
    }

    // console.log('--------------------------------------------');
  }
  // console.log('horizontals', horizontals.length, horizontals);
  // console.log('verticals', verticals.length, verticals);
  const horSum = horizontals.reduce((a, b) => a + b, 0);
  const verSum = verticals.reduce((a, b) => a + b, 0);
  return horSum * 100 + verSum;
};
console.log('part1 answer: ', part1());
console.log('part2 answer: ', part2());
