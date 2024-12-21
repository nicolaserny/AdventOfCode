import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

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

function cut(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
}

function checkWithTolerate(arr, incr, max) {
  if (checkReport(arr, incr, max)) return true;
  return arr.some((_, i, a) => checkReport(cut(a, i), incr, max));
}

const result = reports.reduce(
  (acc, el) =>
    checkWithTolerate(el, true, 3) || checkWithTolerate(el, false, 3)
      ? acc + 1
      : acc,
  0,
);

console.log(result);
