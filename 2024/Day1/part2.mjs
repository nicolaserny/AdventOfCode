import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

const lists = data
  .filter((el) => !!el)
  .reduce(
    (acc, el) => {
      const values = el.split(/\s+/);
      const indexedList = { ...acc.indexedList };
      if (indexedList[values[1]]) {
        indexedList[values[1]] += 1;
      } else {
        indexedList[values[1]] = 1;
      }
      return {
        list1: [...acc.list1, values[0]],
        indexedList,
      };
    },
    { list1: [], indexedList: {} },
  );

const result = lists.list1.reduce((acc, el) => {
  return acc + el * (lists.indexedList[el] || 0);
}, 0);

console.log(result);
