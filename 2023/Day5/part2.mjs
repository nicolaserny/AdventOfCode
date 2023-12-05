import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

function getSeedRanges(rawStr) {
  const seedData = rawStr
    .split(":")[1]
    .trim("")
    .split(" ")
    .map((s) => parseInt(s));
  const ranges = [];
  while (seedData.length) {
    const start = seedData.shift();
    const range = seedData.shift();
    ranges.push({ start, range });
  }
  return ranges;
}

function isSeedInRange(seed, ranges) {
  return ranges.some((r) => seed >= r.start && seed <= r.start + r.range);
}

const seedRanges = getSeedRanges(data[0]);

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
    if (value >= data.to && value <= data.to + data.range) {
      return data.from + (value - data.to);
    }
  }
  return value;
}

// Process locations until we find a location that is in range of all seeds
let currentLocation = 1;
let found = false;
let result = undefined;
while (!found) {
  let type = "location";
  let value = currentLocation;
  while (type !== "seed") {
    const mapping = mappings.find((m) => m.to === type);
    type = mapping.from;
    value = convertValue(mapping.convertData, value);
    if (type === "seed") {
      found = isSeedInRange(value, seedRanges);
      if (found) {
        result = currentLocation;
      }
    }
  }
  currentLocation++;
}

console.log(result);
