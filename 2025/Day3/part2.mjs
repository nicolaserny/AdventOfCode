import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const ratings = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split("").map((char) => parseInt(char));
  });

function getLargestJoltage(rating) {
  const joltages = [];
  let previousDigitIndex = -1;
  const numberOfDigits = 12;
  for (let j = 0; j < numberOfDigits; j++) {
    let currentDigit = rating[previousDigitIndex + 1];
    let currentDigitIndex = previousDigitIndex + 1;

    const maxIndex = rating.length - numberOfDigits + j + 1;

    for (let i = previousDigitIndex + 1; i < maxIndex; i++) {
      if (rating[i] > currentDigit) {
        currentDigit = rating[i];
        currentDigitIndex = i;
      }
    }
    joltages.push(currentDigit);
    previousDigitIndex = currentDigitIndex;
  }
  return parseInt(joltages.map((e) => e.toString()).join(""));
}

const result = ratings.map(getLargestJoltage).reduce((acc, el) => acc + el, 0);

console.log(result);
