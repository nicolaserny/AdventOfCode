import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

function getCrtValue(c, v) {
  const val = (c % 40) - 1;
  if (val >= v - 1 && val <= v + 1) {
    return "#";
  }
  return ".";
}

let cycle = 0;
let value = 1;
let crt = [];
for (let i = 0; i < data.length; i++) {
  const el = data[i].trim();
  if (el) {
    const instructionData = el.split(" ");
    const instruction = instructionData[0];
    switch (instruction) {
      case "noop":
        cycle++;
        crt.push(getCrtValue(cycle, value));
        break;
      case "addx":
        cycle++;
        crt.push(getCrtValue(cycle, value));
        cycle++;
        crt.push(getCrtValue(cycle, value));
        value = value + +instructionData[1];
        break;
    }
  }
}
for (let i = 0; i < crt.length; i = i + 40) {
  console.log(crt.slice(i, i + 40).join(""));
}
