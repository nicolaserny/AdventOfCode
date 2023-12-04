import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const engineMap = [];
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    engineMap.push(val.split(""));
  }
}

function checkAdjacent(x, y, map) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && j >= 0 && i < map.length && j < map[i].length) {
        if (map[i][j] !== "." && !map[i][j].match(/[0-9]/)) {
          return true;
        }
      }
    }
  }
  return false;
}

const numbers = [];
for (let i = 0; i < engineMap.length; i++) {
  const row = engineMap[i];
  let tmpNumber = "";
  let isAdjacent = false;
  for (let j = 0; j < row.length; j++) {
    const el = row[j];
    if (el.match(/[0-9]/)) {
      tmpNumber += el;
      isAdjacent = isAdjacent ? isAdjacent : checkAdjacent(i, j, engineMap);
      if (j === row.length - 1 && isAdjacent) {
        numbers.push(parseInt(tmpNumber));
      }
    } else {
      if (tmpNumber) {
        if (isAdjacent) {
          numbers.push(parseInt(tmpNumber));
        }
        tmpNumber = "";
      }
      isAdjacent = false;
    }
  }
}

console.log(numbers.reduce((acc, v) => acc + v, 0));
