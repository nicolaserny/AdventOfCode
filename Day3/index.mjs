import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

function convertToCode(val) {
  if (val.match(/[a-z]/)) {
    return val.charCodeAt(0) - 96;
  }
  return val.charCodeAt(0) - 38;
}

let res = 0;
for (let i = 0; i < data.length; i = i + 3) {
  if (data[i]) {
    const data1 = data[i].split("");
    const data2 = data[i + 1].split("");
    const data3 = data[i + 2].split("");
    if (data1 && data2 && data3) {
      const duplicates = data1.reduce(
        (acc, e) =>
          data2.includes(e) && data3.includes(e) && !acc.includes(e)
            ? [...acc, e]
            : acc,
        []
      );
      res = res + duplicates.reduce((acc, e) => acc + convertToCode(e), 0);
    }
  }
}
console.log(res);
