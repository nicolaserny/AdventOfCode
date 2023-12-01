import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

let res = [];
let tmp = 0;
for (let i = 0; i < data.length; i++) {
  const val = +data[i].trim();
  if (val) {
    tmp += val;
  } else {
    res.push(tmp);
    tmp = 0;
  }
}
res = res.sort((a, b) => b - a);
console.log(res[0] + res[1] + res[2]);
