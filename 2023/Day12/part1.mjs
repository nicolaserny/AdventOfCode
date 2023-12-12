import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

function parseRow(row) {
  const currentRow = row.split(" ");
  return {
    springs: currentRow[0],
    conditions: currentRow[1].split(",").map((e) => parseInt(e)),
  };
}

function isValid(row) {
  const { springs, conditions } = row;
  const springGroups = springs.split(".").filter((e) => !!e);
  if (springGroups.length !== conditions.length) {
    return false;
  }
  for (let i = 0; i < springGroups.length; i++) {
    if (springGroups[i].length !== conditions[i]) {
      return false;
    }
  }
  return true;
}

function findUnknowns(row) {
  return row.springs
    .split("")
    .reduce((acc, curr, index) => (curr === "?" ? [...acc, index] : acc), []);
}

function createCombinations(nb) {
  function helper(nb, results) {
    if (nb === 0) {
      return results;
    }
    return [
      ...helper(nb - 1, [
        ...results.map((e) => e + "#"),
        ...results.map((e) => e + "."),
      ]),
    ];
  }
  return helper(nb, [""]);
}

let result = 0;
for (let row of data) {
  if (row) {
    let nbOfValidArrangements = 0;
    const parsedRow = parseRow(row);
    const unknowns = findUnknowns(parsedRow);
    // Check all combinations
    const combinations = createCombinations(unknowns.length);
    for (let i = 0; i < combinations.length; i++) {
      const rowAfterRemplacement = parsedRow.springs.split("");
      for (let j = 0; j < unknowns.length; j++) {
        rowAfterRemplacement[unknowns[j]] = combinations[i][j];
      }
      if (
        isValid({
          springs: rowAfterRemplacement.join(""),
          conditions: parsedRow.conditions,
        })
      ) {
        nbOfValidArrangements++;
      }
    }
    result += nbOfValidArrangements;
  }
}

console.log(result);
