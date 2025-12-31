import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const rolls = data
  .filter((el) => !!el)
  .map((el) => {
    return el.split("");
  });

function canAccess(currentRowIndex, currentColumnIndex) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0)) {
        const rowIndex = currentRowIndex + i;
        const columnIndex = currentColumnIndex + j;
        if (
          !(
            rowIndex < 0 ||
            rowIndex >= rolls.length ||
            columnIndex < 0 ||
            columnIndex >= rolls[0].length
          ) &&
          rolls[rowIndex][columnIndex] === "@"
        ) {
          count++;
        }
      }
    }
  }
  return count < 4;
}

let result = 0;
for (let i = 0; i < rolls.length; i++) {
  const row = rolls[i];
  for (let j = 0; j < row.length; j++) {
    if (row[j] === "@" && canAccess(i, j)) {
      result++;
    }
  }
}

console.log(result);
