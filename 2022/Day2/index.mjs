import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);
const refs = {
  A: "X",
  B: "Y",
  C: "Z",
};
function score(x, y) {
  switch (x) {
    case "A":
      if (y === "X") {
        return 0 + 3;
      }
      if (y === "Y") {
        return 3 + 1;
      }
      if (y === "Z") {
        return 6 + 2;
      }
    case "B":
      if (y === "X") {
        return 0 + 1;
      }
      if (y === "Y") {
        return 3 + 2;
      }
      if (y === "Z") {
        return 6 + 3;
      }
    case "C":
      if (y === "X") {
        return 0 + 2;
      }
      if (y === "Y") {
        return 3 + 3;
      }
      if (y === "Z") {
        return 6 + 1;
      }
  }
}
const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

let res = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].trim()) {
    const el = data[i].trim().split(" ");
    res = res + score(el[0], el[1]);
    // console.log(score(el[0], el[1]));
  }
}
console.log(res);
