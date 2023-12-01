import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

const mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function findFirstDigit(str) {
  let currentStr = str;
  while (currentStr.length > 0) {
    if (currentStr[0].match(/[0-9]/)) {
      return currentStr[0];
    }
    for (let j = 0; j < Object.keys(mapping).length; j++) {
      if (currentStr.startsWith(Object.keys(mapping)[j])) {
        return mapping[Object.keys(mapping)[j]];
      }
    }
    currentStr = currentStr.slice(1);
  }
  return undefined;
}

function findLastDigit(str) {
  let currentStr = str;
  while (currentStr.length > 0) {
    if (currentStr[currentStr.length - 1].match(/[0-9]/)) {
      return currentStr[currentStr.length - 1];
    }
    for (let j = 0; j < Object.keys(mapping).length; j++) {
      if (currentStr.endsWith(Object.keys(mapping)[j])) {
        return mapping[Object.keys(mapping)[j]];
      }
    }
    currentStr = currentStr.slice(0, -1);
  }
  return undefined;
}
let result = 0;
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    const first = findFirstDigit(val);
    const last = findLastDigit(val);
    result += parseInt(`${first}${last}`);
  }
}

console.log(result);
