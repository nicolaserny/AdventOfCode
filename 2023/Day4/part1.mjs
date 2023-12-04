import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

function createCard(str) {
  const cardData = str
    .split(":")[1]
    .split("|")
    .map((s) => s.trim());
  return {
    winningNumbers: new Set(
      cardData[0]
        .split(" ")
        .filter((e) => !!e)
        .map((s) => parseInt(s.trim())),
    ),
    numbers: cardData[1]
      .split(" ")
      .filter((e) => !!e)
      .map((s) => parseInt(s.trim())),
  };
}

let result = 0;
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    const card = createCard(val);
    result += card.numbers.reduce((acc, v) => {
      if (card.winningNumbers.has(v)) {
        return acc === 0 ? 1 : acc * 2;
      }
      return acc;
    }, 0);
  }
}

console.log(result);
