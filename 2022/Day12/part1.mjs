import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

function getHeight(val) {
  return (val === "S" ? "a" : val === "E" ? "z" : val).charCodeAt(0) - 96;
}

const map = [];
for (let i = 0; i < data.length; i++) {
  const el = data[i].trim();
  if (el) {
    map.push(el.split("").map((e,j) => ));
  }
}

function getMapConfig() {
  let xStart, yStart, xEnd, yEnd;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "S") {
        xStart = j;
        yStart = i;
      }
      if (data[i][j] === "E") {
        xEnd = j;
        yEnd = i;
      }
    }
  }
  return { start: { x: xStart, y: yStart }, end: { x: xEnd, y: yEnd } };
}

const config = getMapConfig();
let steps = -1;
const visited = [];

function visit(x, y, currentSteps, previousHeight) {
  if (visited.findIndex((e) => e.x === x && e.y === y) >= 0) {
    return;
  }
  if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
    return;
  }
  const el = map[y][x];
  const height = getHeight(el);
  if (
    previousHeight &&
    height > previousHeight &&
    height - previousHeight > 1
  ) {
    return;
  }
  const stepsValue = currentSteps + 1;
  if (x === config.end.x && y === config.end.y) {
    if (steps === -1 || stepsValue < steps) {
      steps = stepsValue;
      console.log("newValue", steps);
    }
  }
  if (steps !== -1 && stepsValue > steps) {
    return;
  }
  visited.push({ x, y });
  visit(x + 1, y, stepsValue, height);
  visit(x, y + 1, stepsValue, height);
  visit(x - 1, y, stepsValue, height);
  visit(x, y - 1, stepsValue, height);
}

visit(config.start.x, config.start.y, 0, [], undefined);
console.log(steps - 1);
