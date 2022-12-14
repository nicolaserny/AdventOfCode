import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

function updateSignalStrength(c, v, s) {
  if (c === 20) {
    return s + c * v;
  }
  if (c > 20 && (c - 20) % 40 === 0) {
    return s + c * v;
  }
  return s;
}

let cycle = 0;
let value = 1;
let signal = 0;
for (let i = 0; i < data.length; i++) {
  const el = data[i].trim();
  if (el) {
    const instructionData = el.split(" ");
    const instruction = instructionData[0];
    switch (instruction) {
      case "noop":
        cycle++;
        signal = updateSignalStrength(cycle, value, signal);
        break;
      case "addx":
        cycle++;
        signal = updateSignalStrength(cycle, value, signal);
        cycle++;
        signal = updateSignalStrength(cycle, value, signal);
        value = value + +instructionData[1];
        break;
    }
  }
}
console.log(signal);
