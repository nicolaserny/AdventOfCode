import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

let headx = 0;
let heady = 0;
let tailx = 0;
let taily = 0;
let res = [{ x: tailx, y: taily }];

function isClose(x, y) {
  if (Math.abs(x - headx) <= 1 && Math.abs(y - heady) <= 1) {
    return true;
  }
  return false;
}

function computeNextTailPosition() {
  if (isClose(tailx, taily)) {
    return { x: tailx, y: taily };
  }
  if (tailx === headx) {
    if (isClose(tailx, taily + 1)) {
      return { x: tailx, y: taily + 1 };
    } else {
      return { x: tailx, y: taily - 1 };
    }
  }
  if (taily === heady) {
    if (isClose(tailx + 1, taily)) {
      return { x: tailx + 1, y: taily };
    } else {
      return { x: tailx - 1, y: taily };
    }
  }
  if (isClose(tailx + 1, taily + 1)) {
    return { x: tailx + 1, y: taily + 1 };
  }
  if (isClose(tailx + 1, taily - 1)) {
    return { x: tailx + 1, y: taily - 1 };
  }
  if (isClose(tailx - 1, taily + 1)) {
    return { x: tailx - 1, y: taily + 1 };
  }
  if (isClose(tailx - 1, taily - 1)) {
    return { x: tailx - 1, y: taily - 1 };
  }
}

for (let i = 0; i < data.length; i++) {
  const el = data[i].trim();
  if (el) {
    const move = el.split(" ");
    const action = move[0];
    const n = +move[1];
    for (let j = 0; j < n; j++) {
      switch (action) {
        case "R":
          headx++;
          break;
        case "L":
          headx--;
          break;
        case "U":
          heady++;
          break;
        case "D":
          heady--;
          break;
      }
      const next = computeNextTailPosition();
      tailx = next.x;
      taily = next.y;
      if (res.findIndex((e) => e.x === tailx && e.y === taily) < 0) {
        res.push({ x: tailx, y: taily });
      }
    }
  }
}
console.log(res.length);
