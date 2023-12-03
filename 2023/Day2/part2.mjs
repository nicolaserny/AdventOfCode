import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

let result = 0;
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    const tokens = val.split(":");
    const sets = tokens[1].split(";");
    const fewest = {};
    for (let s of sets) {
      const game = {};
      const elements = s.split(",");
      for (let e of elements) {
        const cubes = e.trim().split(" ");
        const nb = parseInt(cubes[0]);
        const color = cubes[1];
        if (!game[color]) {
          game[color] = nb;
        } else {
          game[color] += nb;
        }
      }
      Object.entries(game).forEach(([k, v]) => {
        if (!fewest[k] || fewest[k] < v) {
          fewest[k] = v;
        }
      });
    }
    result += Object.entries(fewest).reduce((acc, [_, v]) => acc * v, 1);
  }
}

console.log(result);
