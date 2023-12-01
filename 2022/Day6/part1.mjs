import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split("");

let res = 0;
let marker = [];
for (let i = 0; i < data.length; i++) {
  if (data[i]) {
    const e = data[i];
    if (!marker.includes(e)) {
      marker.push(e);
    } else {
      while (marker.includes(e)) {
        marker.shift();
      }
      marker.push(e);
    }
    if (marker.length === 4) {
      res = i + 1;
      break;
    }
  }
}
console.log(res);
