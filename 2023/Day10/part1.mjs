import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const maze = [];
let startRow = 0;
let startCol = 0;
let i = 0;
for (let row of data) {
  if (row) {
    const currentRow = row.split("");
    maze.push(currentRow);
    const col = currentRow.indexOf("S");
    if (col >= 0) {
      startRow = i;
      startCol = col;
    }
    i++;
  }
}

const connectorMapping = {
  "|": {
    top: ["|", "7", "F", "S"],
    bottom: ["|", "J", "L", "S"],
    left: [],
    right: [],
  },
  "-": {
    top: [],
    bottom: [],
    left: ["-", "L", "F", "S"],
    right: ["-", "J", "7", "S"],
  },
  F: {
    top: [],
    bottom: ["S", "|", "L", "J"],
    left: [],
    right: ["-", "J", "7", "S"],
  },
  7: {
    top: [],
    bottom: ["S", "|", "L", "J"],
    left: ["-", "L", "F", "S"],
    right: [],
  },
  L: {
    top: ["S", "|", "7", "F"],
    bottom: [],
    left: [],
    right: ["-", "7", "J", "S"],
  },
  J: {
    top: ["S", "|", "7", "F"],
    bottom: [],
    left: ["-", "L", "F", "S"],
    right: [],
  },
  S: {
    top: ["|", "7", "F"],
    bottom: ["|", "J", "L"],
    left: ["-", "L", "F"],
    right: ["-", "7", "J"],
  },
};

function getCoordinates(direction, currentElement) {
  switch (direction) {
    case "top":
      if (currentElement.row - 1 < 0) return undefined;
      return [currentElement.row - 1, currentElement.col];
    case "bottom":
      if (currentElement.row + 1 >= maze.length) return undefined;
      return [currentElement.row + 1, currentElement.col];
    case "left":
      if (currentElement.col - 1 < 0) return undefined;
      return [currentElement.row, currentElement.col - 1];
    case "right":
      if (currentElement.col + 1 >= maze[currentElement.row].length)
        return undefined;
      return [currentElement.row, currentElement.col + 1];
  }
}

function processNeighbors(direction, currentElement, connector) {
  const coordinates = getCoordinates(direction, currentElement);
  if (coordinates === undefined) return [];
  const [row, col] = coordinates;
  const value = maze[row][col];
  if (
    connector[direction].includes(value) &&
    !currentElement.markedElements.has(`${row},${col}`)
  ) {
    return [
      {
        row,
        col,
        markedElements: new Set(currentElement.markedElements).add(
          `${currentElement.row},${currentElement.col}`,
        ),
      },
    ];
  }
  return [];
}

let currentElements = [
  { row: startRow, col: startCol, markedElements: new Set() },
];
let steps = 0;
while (currentElements.length > 0) {
  let nextElements = [];
  for (let currentElement of currentElements) {
    const value = maze[currentElement.row][currentElement.col];
    if (value !== ".") {
      if (
        value !== "S" ||
        (value === "S" &&
          currentElement.row === startRow &&
          currentElement.col === startCol)
      ) {
        const connector = connectorMapping[value];
        nextElements = [
          ...nextElements,
          ...processNeighbors("top", currentElement, connector),
          ...processNeighbors("bottom", currentElement, connector),
          ...processNeighbors("left", currentElement, connector),
          ...processNeighbors("right", currentElement, connector),
        ];
      }
    }
  }
  steps++;
  currentElements = nextElements;
}

console.log(steps / 2);
