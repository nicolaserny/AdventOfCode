import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const steps = data[0].replace(/\r?\n/g, "").split(",");

function hash(step) {
  let value = 0;
  for (let i = 0; i < step.length; i++) {
    const asciiCode = step.charCodeAt(i);
    value += asciiCode;
    value = (value * 17) % 256;
  }
  return value;
}

const result = steps.reduce((acc, curr) => acc + hash(curr), 0);
console.log(result);
