import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

const image = [];

for (let row of data) {
  if (row) {
    const currentRow = row.split("");
    image.push(currentRow);
  }
}

// expand universe
const rowIndexesToExpand = [];
const columnIndexesToExpand = [];
const expandFactor = 1000000 - 1; // Do not forget to subtract 1 from the factor

// expand rows
for (let rowIndex = 0; rowIndex < image.length; rowIndex++) {
  const row = image[rowIndex];
  if (!row.some((cell) => cell === "#")) {
    rowIndexesToExpand.push(rowIndex);
  }
}

// expand columns
for (let i = 0; i < image[0].length; i++) {
  let shouldExpand = true;
  for (let j = 0; j < image.length; j++) {
    if (image[j][i] === "#") {
      shouldExpand = false;
      break;
    }
  }
  if (shouldExpand) {
    columnIndexesToExpand.push(i);
  }
}

// Find galaxy coordinates
const galaxyCoordinates = [];
for (let rowIndex = 0; rowIndex < image.length; rowIndex++) {
  let row = image[rowIndex];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    if (row[colIndex] === "#") {
      galaxyCoordinates.push([rowIndex, colIndex]);
    }
  }
}

// Shortest path for each pair of galaxies
let shortestPathSum = 0;
const pairs = new Set();
for (let i = 0; i < galaxyCoordinates.length; i++) {
  for (let j = i + 1; j < galaxyCoordinates.length; j++) {
    const [row1, col1] = galaxyCoordinates[i];
    const [row2, col2] = galaxyCoordinates[j];
    const pairString = `${row1},${col1}-${row2},${col2}`;
    const pairStringReverse = `${row2},${col2}-${row1},${col1}`;
    if (!pairs.has(pairString) && !pairs.has(pairStringReverse)) {
      pairs.add(pairString);
      const rowExpands = rowIndexesToExpand.reduce(
        (acc, curr) =>
          (curr > row1 && curr < row2) || (curr < row1 && curr > row2)
            ? acc + 1
            : acc,
        0,
      );
      const colExpands = columnIndexesToExpand.reduce(
        (acc, curr) =>
          (curr > col1 && curr < col2) || (curr < col1 && curr > col2)
            ? acc + 1
            : acc,
        0,
      );
      const shortestPath =
        Math.abs(row1 - row2) +
        Math.abs(col1 - col2) +
        (rowExpands + colExpands) * expandFactor;
      shortestPathSum += shortestPath;
    }
  }
}
console.log(shortestPathSum);
