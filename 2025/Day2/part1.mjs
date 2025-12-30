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

function isValidId(id) {
  const middleIndex = Math.floor(id.length / 2);
  const firstHalf = id.slice(0, middleIndex);
  const secondHalf = id.slice(middleIndex);
  return firstHalf !== secondHalf;
}

const invalidIdArray = inputs.reduce((acc, range) => {
  let invalidIds = [];
  for (let i = parseInt(range.from); i <= parseInt(range.to); i++) {
    if (!isValidId(i.toString())) {
      invalidIds.push(i);
    }
  }
  return [...acc, ...invalidIds];
}, []);

const result = invalidIdArray.reduce((acc, el) => acc + el, 0);
console.log(result);
