const fs = require('fs');

const filePath = 'input.txt';

const input = fs.readFileSync(filePath, 'utf8');

const almanac = [];
let rows = [];
for (const text of input.split('\r\n')) {
  if (text !== '') rows.push(text);
  else {
    almanac.push(rows);
    rows = [];
  }
}

const seeds = almanac[0][0]
  .substring(almanac[0][0].indexOf(':') + 2)
  .split(' ')
  .map(Number);

const maps = almanac
  .slice(1)
  .map((m) => m.slice(1))
  .map((m) => m.map((line) => line.split(' ')).map((line) => line.map(Number)));
// console.log(maps);
// 0 seedToSoil
// 1 soilToFertilizer
// 2 fertilizerToWater
// 3 waterToLight
// 4 lightToTemperature
// 5 temperatureToHumidity
// 6 humidityToLocation

const convert = (before, map) => {
  // map[0] each array: index 1 <= seeds[0] < (index 1 + index2) => index 0 + (index 1 - seeds[0])
  for (let i = 0; i < map.length; i++) {
    if (map[i][1] <= before && before < map[i][1] + map[i][2])
      return map[i][0] + before - map[i][1];
  }
  return before;
};
const part1 = (seeds) => {
  const locations = [];
  for (const seed of seeds) {
    let start = seed;
    for (const map of maps) start = convert(start, map);
    locations.push(start);
  }
  return locations.sort((a, b) => a - b)[0];
};

console.log('Part1 answer is ', part1(seeds));
