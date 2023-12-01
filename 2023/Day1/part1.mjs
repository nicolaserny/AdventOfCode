import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const result = data
  .filter((el) => !!el)
  .map((el) => {
    const onlyDigits = el.split("").filter((e) => e.match(/[0-9]/));
    return `${onlyDigits[0]}${onlyDigits[onlyDigits.length - 1]}`;
  })
  .reduce((acc, el) => acc + parseInt(el), 0);

console.log(result);
