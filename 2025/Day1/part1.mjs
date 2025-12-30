import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const inputs = data
  .filter((el) => !!el)
  .map((el) => {
    return {
      rotate: el[0] === "R" ? "right" : "left",
      value: parseInt(el.slice(1)),
    };
  });

const position = 50;

const result = inputs.reduce(
  (acc, el) => {
    let newPosition = acc.currentPosition;
    if (el.rotate === "right") {
      newPosition += el.value % 100;
      if (newPosition > 100) {
        newPosition = newPosition - 100;
      }
    } else {
      newPosition -= el.value % 100;
      if (newPosition < 0) {
        newPosition = 100 + newPosition;
      }
    }

    return {
      currentPosition: newPosition,
      count:
        newPosition === 0 || newPosition === 100 ? acc.count + 1 : acc.count,
    };
  },
  { currentPosition: position, count: 0 },
);

console.log(result.count);
