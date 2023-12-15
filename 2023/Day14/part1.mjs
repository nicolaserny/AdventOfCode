import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const puzzle = new Array(data[0].length)
  .fill(null)
  .map(() => new Array(data.length).fill(null));

for (let i = 0; i < data.length; i++) {
  const line = data[i];
  for (let j = 0; j < line.length; j++) {
    puzzle[j][i] = line[j];
  }
}

let load = 0;
for (let line of puzzle) {
  let newLine = [];
  let tmpBufferRocks = [];
  let tmpBufferDots = [];
  for (let i = line.length - 1; i >= 0; i--) {
    if (!line[i]) continue;
    const element = line[i];
    if (element === "#") {
      newLine = [...newLine, ...tmpBufferDots, ...tmpBufferRocks, element];
      tmpBufferRocks = [];
      tmpBufferDots = [];
    }
    if (element === ".") {
      tmpBufferDots.push(element);
    }
    if (element === "O") {
      tmpBufferRocks.push(element);
    }
  }
  newLine = [...newLine, ...tmpBufferDots, ...tmpBufferRocks];
  load += newLine.reduce(
    (acc, curr, index) => (curr === "O" ? acc + index + 1 : acc),
    0,
  );
}

console.log(load);
