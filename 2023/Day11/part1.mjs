import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const image = [];

for (let row of data) {
  if (row) {
    const currentRow = row.split("");
    image.push(currentRow);
  }
}

// expand universe
const expandedImage = [];

// expand rows
for (let row of image) {
  if (row.some((cell) => cell === "#")) {
    expandedImage.push(row);
  } else {
    expandedImage.push(row);
    expandedImage.push([...row]);
  }
}
//
// expand columns
const columnIndexesToExpand = [];
for (let i = 0; i < expandedImage[0].length; i++) {
  let shouldExpand = true;
  for (let j = 0; j < expandedImage.length; j++) {
    if (expandedImage[j][i] === "#") {
      shouldExpand = false;
      break;
    }
  }
  if (shouldExpand) {
    columnIndexesToExpand.push(i);
  }
}
for (let rowIndex = 0; rowIndex < expandedImage.length; rowIndex++) {
  let row = expandedImage[rowIndex];
  for (let i = 0; i < columnIndexesToExpand.length; i++) {
    row.splice(columnIndexesToExpand[i] + i, 0, ".");
  }
}

// Find galaxy coordinates
const galaxyCoordinates = [];
for (let rowIndex = 0; rowIndex < expandedImage.length; rowIndex++) {
  let row = expandedImage[rowIndex];
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
      const shortestPath = Math.abs(row1 - row2) + Math.abs(col1 - col2);
      shortestPathSum += shortestPath;
    }
  }
}
console.log(shortestPathSum);
