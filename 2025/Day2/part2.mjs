import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const inputs = data
  .filter((el) => !!el)
  .reduce((acc, el) => {
    const ranges = el.split(",").filter((el) => !!el);
    return acc.concat(ranges);
  }, [])
  .map((el) => {
    const [start, end] = el.split("-");
    return { from: start, to: end };
  });

function isInvalidId(id) {
  for (
    let patternLength = 1;
    patternLength <= Math.floor(id.length / 2);
    patternLength++
  ) {
    if (id.length % patternLength === 0) {
      // Extract the potential repeating pattern
      const pattern = id.substring(0, patternLength);

      // Build what the full ID would be if this pattern repeated
      const repetitions = id.length / patternLength;
      const repeatedPattern = pattern.repeat(repetitions);

      if (repeatedPattern === id) {
        return true;
      }
    }
  }

  return false;
}

const invalidIdArray = inputs.reduce((acc, range) => {
  let invalidIds = [];
  for (let i = parseInt(range.from); i <= parseInt(range.to); i++) {
    if (isInvalidId(i.toString())) {
      invalidIds.push(i);
    }
  }
  return [...acc, ...invalidIds];
}, []);

const result = invalidIdArray.reduce((acc, el) => acc + el, 0);
console.log(result);
