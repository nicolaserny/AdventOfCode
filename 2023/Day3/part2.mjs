import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

const engineMap = [];
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    engineMap.push(val.split(""));
  }
}

function checkAdjacent(x, y, map) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && j >= 0 && i < map.length && j < map[i].length) {
        if (map[i][j] === "*" && !map[i][j].match(/[0-9]/)) {
          return { row: i, col: j };
        }
      }
    }
  }
  return undefined;
}

function updatePotientialGears(gearSymbols, numberValue, potentials) {
  const updatedPotentials = [...potentials];
  gearSymbols.forEach((gearSymbol) => {
    const index = updatedPotentials.findIndex(
      (g) => g.row === gearSymbol.row && g.col === gearSymbol.col,
    );
    if (index === -1) {
      updatedPotentials.push({
        ...gearSymbol,
        numbers: [parseInt(numberValue)],
      });
    } else {
      updatedPotentials[index].numbers = [
        ...updatedPotentials[index].numbers,
        parseInt(numberValue),
      ];
    }
  });
  return updatedPotentials;
}

let potentialGears = [];

for (let i = 0; i < engineMap.length; i++) {
  const row = engineMap[i];
  let tmpNumber = "";
  let gearSymbols = [];
  for (let j = 0; j < row.length; j++) {
    const el = row[j];
    if (el.match(/[0-9]/)) {
      tmpNumber += el;
      const symbol = checkAdjacent(i, j, engineMap);
      if (
        symbol &&
        gearSymbols.findIndex(
          (s) => s.row === symbol.row && s.col === symbol.col,
        ) === -1
      ) {
        gearSymbols.push(symbol);
      }
      if (j === row.length - 1 && gearSymbols.length > 0) {
        potentialGears = updatePotientialGears(
          gearSymbols,
          tmpNumber,
          potentialGears,
        );
      }
    } else {
      if (tmpNumber) {
        if (gearSymbols.length > 0) {
          potentialGears = updatePotientialGears(
            gearSymbols,
            tmpNumber,
            potentialGears,
          );
        }
        tmpNumber = "";
      }
      gearSymbols = [];
    }
  }
}

const gearRatio = potentialGears
  .filter((g) => g.numbers.length === 2)
  .reduce((acc, gear) => acc + gear.numbers[0] * gear.numbers[1], 0);

console.log(gearRatio);
