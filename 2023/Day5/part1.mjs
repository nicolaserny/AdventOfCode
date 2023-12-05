import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const seeds = data[0]
  .split(":")[1]
  .trim("")
  .split(" ")
  .map((s) => parseInt(s));

// Create mappings
const mappings = [];
let currentMapping = undefined;
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    if (!currentMapping) {
      const regex = /(\w+)-to-(\w+)/;
      const matches = val.match(regex);
      if (matches) {
        const source = matches[1];
        const destination = matches[2];
        currentMapping = { from: source, to: destination, convertData: [] };
      }
    } else {
      const numbers = val.split(" ").map((s) => parseInt(s));
      currentMapping.convertData.push({
        to: numbers[0],
        from: numbers[1],
        range: numbers[2],
      });
    }
  } else {
    if (currentMapping) {
      mappings.push(currentMapping);
      currentMapping = undefined;
    }
  }
}

function convertValue(dataList, value) {
  for (const data of dataList) {
    if (value >= data.from && value <= data.from + data.range) {
      return data.to + (value - data.from);
    }
  }
  return value;
}

// Process all seeds
let result = [];
for (const seed of seeds) {
  let type = "seed";
  let value = seed;
  while (type !== "location") {
    const mapping = mappings.find((m) => m.from === type);
    type = mapping.to;
    value = convertValue(mapping.convertData, value);
  }
  result.push(value);
}

console.log(Math.min(...result));
