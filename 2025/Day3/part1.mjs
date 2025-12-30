import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const ratings = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split("").map((char) => parseInt(char));
  });

function getLargestJoltage(rating) {
  let firstDigit = rating[0];
  let firstDigitIndex = 0;
  for (let i = 1; i < rating.length - 1; i++) {
    // The first digit cannot be the last digit
    if (rating[i] > firstDigit) {
      firstDigit = rating[i];
      firstDigitIndex = i;
    }
  }
  let secondDigit = rating[firstDigitIndex + 1];
  for (let i = firstDigitIndex + 2; i < rating.length; i++) {
    if (rating[i] > secondDigit) {
      secondDigit = rating[i];
    }
  }

  return firstDigit * 10 + secondDigit;
}

const result = ratings.map(getLargestJoltage).reduce((acc, el) => acc + el, 0);

console.log(result);
