import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

let result = 0;
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    const tokens = val.split(":");
    const gameId = parseInt(tokens[0].replace("Game ", ""));
    const sets = tokens[1].split(";");
    let valid = true;
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
      if (game.red > 12 || game.green > 13 || game.blue > 14) {
        valid = false;
        break;
      }
    }
    if (valid) result += gameId;
  }
}

console.log(result);
