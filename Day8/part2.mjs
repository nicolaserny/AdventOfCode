import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

let grid = [];
for (let i = 0; i < data.length; i++) {
  if (data[i]) {
    grid.push(
      data[i]
        .split("")
        .filter((e) => e)
        .map((e) => +e)
    );
  }
}
const w = grid[0].length;
const h = grid.length;
let res = 0;

function scenicScore(a, b) {
  if (a === 0 || a === w - 1 || b === 0 || b === h - 1) {
    return 0;
  }
  const treeHeight = grid[a][b];
  let s1 = 0,
    s2 = 0,
    s3 = 0,
    s4 = 0;
  for (let i = a - 1; i >= 0; i--) {
    s1++;
    if (grid[i][b] >= treeHeight) {
      break;
    }
  }
  for (let i = a + 1; i < w; i++) {
    s2++;
    if (grid[i][b] >= treeHeight) {
      break;
    }
  }
  for (let i = b - 1; i >= 0; i--) {
    s3++;
    if (grid[a][i] >= treeHeight) {
      break;
    }
  }
  for (let i = b + 1; i < h; i++) {
    s4++;
    if (grid[a][i] >= treeHeight) {
      break;
    }
  }
  return s1 * s2 * s3 * s4;
}

for (let i = 0; i < w; i++) {
  for (let j = 0; j < h; j++) {
    const score = scenicScore(i, j);
    if (score > res) {
      res = score;
    }
  }
}
console.log(res);
