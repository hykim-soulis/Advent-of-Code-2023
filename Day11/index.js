const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf-8');
const universe = input
  .split('\n')
  .slice(0, -1)
  .map((u) => u.replace('\r', '').split(''))
  .map((u) => u.map((a) => a.replaceAll('.', 0).replaceAll('#', 1)))
  .map((u) => u.map(Number));

const part1 = () => {
  const galaxies = [];
  const distances = [];

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === 1) galaxies.push([i, j]);
    }
  }

  const rows = galaxies.map((gal) => gal[0]);
  const cols = galaxies.map((gal) => gal[1]).sort((a, b) => a - b);

  const doubleRows = [];
  const doubleCols = [];

  for (let i = 0; i < universe.length; i++) {
    if (rows.indexOf(i) === -1) doubleRows.push(i);
  }

  for (let i = 0; i < universe[0].length; i++) {
    if (cols.indexOf(i) === -1) doubleCols.push(i);
  }

  for (let i = 0; i < doubleRows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (doubleRows[i] + i < rows[j]) rows[j] += 1;
    }
  }

  for (let i = 0; i < doubleCols.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      if (doubleCols[i] + i < cols[j]) cols[j] += 1;
    }
  }

  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) distances.push(rows[j] - rows[i]);
  }

  for (let i = 0; i < cols.length; i++) {
    for (let j = i + 1; j < cols.length; j++) distances.push(cols[j] - cols[i]);
  }

  return distances.reduce((a, b) => a + b, 0);
};

const part2 = () => {
  const galaxies = [];
  const distances = [];

  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === 1) galaxies.push([i, j]);
    }
  }

  const rows = galaxies.map((gal) => gal[0]);
  const cols = galaxies.map((gal) => gal[1]).sort((a, b) => a - b);

  const doubleRows = [];
  const doubleCols = [];

  for (let i = 0; i < universe.length; i++) {
    if (rows.indexOf(i) === -1) doubleRows.push(i);
  }

  for (let i = 0; i < universe[0].length; i++) {
    if (cols.indexOf(i) === -1) doubleCols.push(i);
  }

  for (let i = 0; i < doubleRows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (doubleRows[i] + 999999 * i < rows[j]) rows[j] += 999999;
    }
  }

  for (let i = 0; i < doubleCols.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      if (doubleCols[i] + 999999 * i < cols[j]) cols[j] += 999999;
    }
  }

  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) distances.push(rows[j] - rows[i]);
  }

  for (let i = 0; i < cols.length; i++) {
    for (let j = i + 1; j < cols.length; j++) distances.push(cols[j] - cols[i]);
  }

  return distances.reduce((a, b) => a + b, 0);
};

console.log('Part1 answer is ', part1());
console.log('Part2 answer is ', part2());
