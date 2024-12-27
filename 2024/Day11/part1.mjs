import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);
let stones = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split(/\s+/);
  })[0]
  .map((el) => parseInt(el));

function processStone(value) {
  if (value === 0) {
    return [1];
  }
  const strValue = value.toString();
  if (strValue.length % 2 === 0) {
    const value1 = parseInt(strValue.slice(0, strValue.length / 2));
    const value2 = parseInt(strValue.slice(strValue.length / 2));
    return [value1, value2];
  }
  return [value * 2024];
}

const nbOfBlinks = 25;
for (let i = 0; i < nbOfBlinks; i++) {
  stones = stones.flatMap((stone) => processStone(stone));
}

console.log(stones.length);
