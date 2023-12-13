import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const puzzles = [];
let currentPuzzle = { rows: [] };
for (let row of data) {
  if (row) {
    currentPuzzle.rows.push(row.split(""));
  } else {
    puzzles.push(currentPuzzle);
    currentPuzzle = { rows: [] };
  }
}

// Indexed by column
for (let puzzle of puzzles) {
  const columns = new Array(puzzle.rows[0].length).fill(null).map(() => []);
  for (let row of puzzle.rows) {
    for (let i = 0; i < row.length; i++) {
      columns[i].push(row[i]);
    }
  }
  puzzle.columns = columns;
}

function checkArrayReflection(elements, i) {
  for (let j = i + 1; j < elements.length; j++) {
    if (!(2 * i - j + 1 < 0 || elements[j] === elements[2 * i - j + 1])) {
      return false;
    }
  }
  return true;
}

function checkAllRowsReflection(elements, i) {
  for (let element of elements) {
    if (!checkArrayReflection(element, i)) {
      return false;
    }
  }
  return true;
}

function findReflectionIndex(elements) {
  // start in the middle, because we want to find the largest reflection
  const middleIndex = Math.floor(elements[0].length / 2);
  for (let i = middleIndex; i < elements[0].length - 1; i++) {
    if (checkAllRowsReflection(elements, i)) {
      return i + 1;
    }
    if (
      2 * middleIndex - i - 1 >= 0 &&
      checkAllRowsReflection(elements, 2 * middleIndex - i - 1)
    ) {
      return 2 * middleIndex - i;
    }
  }
  return -1;
}

let result = 0;
for (let puzzle of puzzles) {
  const vertical = findReflectionIndex(puzzle.rows);
  const horizontal = findReflectionIndex(puzzle.columns);
  result +=
    (vertical === -1 ? 0 : vertical) +
    (horizontal === -1 ? 0 : 100 * horizontal);
}

console.log(result);
