import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const timeList = data[0]
  .split(":")
  .map((s) => s.trim())
  .at(1)
  .split(" ")
  .filter((s) => !!s)
  .map((s) => parseInt(s.trim()));
const distanceList = data[1]
  .split(":")
  .map((s) => s.trim())
  .at(1)
  .split(" ")
  .filter((s) => !!s)
  .map((s) => parseInt(s.trim()));

// Process each race and compute error margin
let errorMargin = 1;
for (let i = 0; i < timeList.length; i++) {
  const time = timeList[i];
  const distance = distanceList[i];
  let winning = 0;
  for (let j = 0; j < time; j++) {
    const currentDistance = j * (time - j);
    if (currentDistance > distance) {
      winning++;
    }
  }
  errorMargin *= winning;
}

console.log(errorMargin);
