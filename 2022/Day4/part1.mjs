import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

let res = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i]) {
    const pair = data[i].split(",").map((e) => e.trim());
    const interval1 = pair[0].split("-").map((e) => +e);
    const interval2 = pair[1].split("-").map((e) => +e);
    if (
      (interval1[0] <= interval2[0] && interval1[1] >= interval2[1]) ||
      (interval1[0] >= interval2[0] && interval1[1] <= interval2[1])
    ) {
      res++;
    }
  }
}
console.log(res);
