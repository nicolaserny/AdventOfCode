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
    let clicks = Math.floor(el.value / 100);
    let newPosition = acc.currentPosition;

    if (el.rotate === "right") {
      const remainder = el.value % 100;
      newPosition += remainder;
      if (newPosition >= 100 && acc.currentPosition !== 0) {
        clicks += 1;
        newPosition = newPosition === 100 ? 0 : newPosition - 100;
      } else if (newPosition > 100) {
        newPosition = newPosition - 100;
      } else if (newPosition === 100) {
        newPosition = 0; // Normalize 100 to 0
      }
    } else {
      const remainder = el.value % 100;
      newPosition -= remainder;
      if (newPosition <= 0 && acc.currentPosition !== 0) {
        clicks += 1;
        newPosition = newPosition === 0 ? 0 : 100 + newPosition;
      } else if (newPosition < 0) {
        newPosition = 100 + newPosition;
      }
    }
    console.log(
      `Rotate ${el.rotate} by ${el.value}: New Position: ${newPosition}, Clicks: ${clicks}`,
    );

    return {
      currentPosition: newPosition,
      count: acc.count + clicks,
    };
  },
  { currentPosition: position, count: 0 },
);

console.log(result.count);
