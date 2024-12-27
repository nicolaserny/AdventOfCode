import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);
let stones = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split(/\s+/);
  })[0]
  .map((el) => parseInt(el));

function memoize(f) {
  const memo = {};
  return (n) => (Object.hasOwn(memo, n) ? memo[n] : (memo[n] = f(n)));
}

function processStone(value) {
  const intValue = parseInt(value);
  if (intValue === 0) {
    return ["1"];
  }
  if (value.length % 2 === 0) {
    const value1 = value.slice(0, value.length / 2);
    const value2 = value.slice(value.length / 2);
    return [parseInt(value1).toString(), parseInt(value2).toString()]; // to avoid leading zeros
  }
  return [(intValue * 2024).toString()];
}

const nbOfBlinks = 75;
const memoizedProcessStone = memoize(processStone);
let indexedStones = Object.fromEntries(
  stones.map((s) => [s, stones.filter((x) => x == s).length]),
);
for (let i = 0; i < nbOfBlinks; i++) {
  const tmp = {};
  Object.entries(indexedStones).forEach(([stone, count]) => {
    const processedStone = memoizedProcessStone(stone);
    processedStone.forEach((e) => {
      tmp[e] = count + (tmp[e] || 0);
    });
  });
  indexedStones = tmp;
}
const result = Object.values(indexedStones).reduce((acc, el) => acc + el, 0);
console.log(result);
