import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

const ropesNumber = 10;
const ropes = [...Array(ropesNumber)].map((e) => ({ x: 0, y: 0 }));
let res = [{ x: 0, y: 0 }];

function isClose(headx, heady, tailx, taily) {
  if (Math.abs(tailx - headx) <= 1 && Math.abs(taily - heady) <= 1) {
    return true;
  }
  return false;
}

function computeNextTailPosition(headx, heady, tailx, taily) {
  if (isClose(headx, heady, tailx, taily)) {
    return { x: tailx, y: taily };
  }
  if (tailx === headx) {
    if (isClose(headx, heady, tailx, taily + 1)) {
      return { x: tailx, y: taily + 1 };
    } else {
      return { x: tailx, y: taily - 1 };
    }
  }
  if (taily === heady) {
    if (isClose(headx, heady, tailx + 1, taily)) {
      return { x: tailx + 1, y: taily };
    } else {
      return { x: tailx - 1, y: taily };
    }
  }
  if (isClose(headx, heady, tailx + 1, taily + 1)) {
    return { x: tailx + 1, y: taily + 1 };
  }
  if (isClose(headx, heady, tailx + 1, taily - 1)) {
    return { x: tailx + 1, y: taily - 1 };
  }
  if (isClose(headx, heady, tailx - 1, taily + 1)) {
    return { x: tailx - 1, y: taily + 1 };
  }
  if (isClose(headx, heady, tailx - 1, taily - 1)) {
    return { x: tailx - 1, y: taily - 1 };
  }
}

function compute(headx, heady, tailx, taily) {
  const next = computeNextTailPosition(headx, heady, tailx, taily);
  return { headx: headx, heady: heady, tailx: next.x, taily: next.y };
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
          ropes[0].x = ropes[0].x + 1;
          break;
        case "L":
          ropes[0].x = ropes[0].x - 1;
          break;
        case "U":
          ropes[0].y = ropes[0].y + 1;
          break;
        case "D":
          ropes[0].y = ropes[0].y - 1;
          break;
      }
      for (let k = 0; k < ropesNumber - 1; k++) {
        const headx = ropes[k].x;
        const heady = ropes[k].y;
        const tailx = ropes[k + 1].x;
        const taily = ropes[k + 1].y;
        const next = compute(headx, heady, tailx, taily);
        ropes[k].x = next.headx;
        ropes[k].y = next.heady;
        ropes[k + 1].x = next.tailx;
        ropes[k + 1].y = next.taily;
        if (
          k === ropesNumber - 2 &&
          res.findIndex((e) => e.x === next.tailx && e.y === next.taily) < 0
        ) {
          res.push({ x: next.tailx, y: next.taily });
        }
      }
    }
  }
}
console.log(res.length);
