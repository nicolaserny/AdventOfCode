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

function isVisible(a, b) {
  if (a === 0 || a === w - 1 || b === 0 || b === h - 1) {
    return true;
  }
  const treeHeight = grid[a][b];
  let v1 = true,
    v2 = true,
    v3 = true,
    v4 = true;
  for (let i = 0; i < a; i++) {
    if (grid[i][b] >= treeHeight) {
      v1 = false;
    }
  }
  for (let i = a + 1; i < w; i++) {
    if (grid[i][b] >= treeHeight) {
      v2 = false;
    }
  }
  for (let i = 0; i < b; i++) {
    if (grid[a][i] >= treeHeight) {
      v3 = false;
    }
  }
  for (let i = b + 1; i < h; i++) {
    if (grid[a][i] >= treeHeight) {
      v4 = false;
    }
  }
  return v1 || v2 || v3 || v4;
}

for (let i = 0; i < w; i++) {
  for (let j = 0; j < h; j++) {
    if (isVisible(i, j)) {
      res++;
    }
  }
}
console.log(res);
