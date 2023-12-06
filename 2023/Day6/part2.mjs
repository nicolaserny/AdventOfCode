import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

const time = parseInt(
  data[0]
    .split(":")
    .map((s) => s.trim())
    .at(1)
    .trim()
    .replaceAll(" ", ""),
);
const distance = parseInt(
  data[1]
    .split(":")
    .map((s) => s.trim())
    .at(1)
    .trim()
    .replaceAll(" ", ""),
);

// Compute not winning race
let notWinning = 0;
for (let j = 0; j <= time; j++) {
  const currentDistance = j * (time - j);
  if (currentDistance > distance) {
    break;
  }
  notWinning++;
}
for (let j = time; j >= 0; j--) {
  const currentDistance = j * (time - j);
  if (currentDistance > distance) {
    break;
  }
  notWinning++;
}
const winning = time + 1 - notWinning;

console.log(winning);
