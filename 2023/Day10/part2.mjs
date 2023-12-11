import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

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

function processNeighbors(direction, currentElement, connector, isStart) {
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
        markedElements: isStart
          ? new Set()
          : new Set(currentElement.markedElements).add(
              `${currentElement.row},${currentElement.col}`,
            ),
      },
    ];
  }
  return [];
}

function createPathCoordinates(points) {
  const coordinates = points.reduce(
    (acc, curr) => {
      const [row, col] = curr.split(",");
      if (acc.byRows.has(row)) {
        acc.byRows.get(row).push(col);
        acc.byRows.get(row).sort((a, b) => a - b);
      } else {
        acc.byRows.set(row, [col]);
      }
      return acc;
    },
    { byRows: new Map() },
  );
  return coordinates;
}

let currentElements = [
  { row: startRow, col: startCol, markedElements: new Set() },
];
let steps = 0;
let path = undefined;
let isInitial = true;
while (currentElements.length > 0) {
  let nextElements = [];
  for (let currentElement of currentElements) {
    const value = maze[currentElement.row][currentElement.col];
    if (value !== ".") {
      const connector = connectorMapping[value];
      nextElements = [
        ...nextElements,
        ...processNeighbors("top", currentElement, connector, isInitial),
        ...processNeighbors("bottom", currentElement, connector, isInitial),
        ...processNeighbors("left", currentElement, connector, isInitial),
        ...processNeighbors("right", currentElement, connector, isInitial),
      ];
      isInitial = false;
      if (value === "S" && !isInitial) {
        path = createPathCoordinates([...currentElement.markedElements]);
      }
    }
  }
  steps++;
  currentElements = nextElements;
}

if (path.byRows.has(startRow.toString())) {
  path.byRows.get(startRow.toString()).push(startCol.toString());
  path.byRows.get(startRow.toString()).sort((a, b) => a - b);
} else {
  path.byRows.set(startRow.toString(), [startCol.toString()]);
}

// Find enclosed tiles: Ray casting algorithm
let enclosedTiles = 0;
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[i].length; j++) {
    // Check tiles that are not in the path
    if (
      !(
        path.byRows.has(i.toString()) &&
        path.byRows.get(i.toString()).includes(j.toString())
      )
    ) {
      const rowIntersectionsLeft =
        path.byRows
          .get(i.toString())
          ?.filter((e) => e < j && ["|", "L", "J"].includes(maze[i][e]))
          .length || 0;
      if (rowIntersectionsLeft % 2 !== 0) {
        enclosedTiles++;
      }
    }
  }
}

console.log(enclosedTiles);
