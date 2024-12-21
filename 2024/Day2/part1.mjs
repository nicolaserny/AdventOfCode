import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const reports = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split(/\s+/);
  });

function checkReport(report, incr, max) {
  let current = undefined;
  for (let el of report) {
    if (current) {
      if (
        (incr && el - current > 0 && el - current <= max) ||
        (!incr && current - el > 0 && current - el <= max)
      ) {
        current = el;
      } else {
        return false;
      }
    } else {
      current = el;
    }
  }
  return true;
}

const result = reports.reduce(
  (acc, el) =>
    checkReport(el, true, 3) || checkReport(el, false, 3) ? acc + 1 : acc,
  0,
);

console.log(result);
