import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const lists = data
  .filter((el) => !!el)
  .reduce(
    (acc, el) => {
      const values = el.split(/\s+/);
      return {
        list1: [...acc.list1, values[0]],
        list2: [...acc.list2, values[1]],
      };
    },
    { list1: [], list2: [] },
  );
lists.list1.sort();
lists.list2.sort();

const result = lists.list1.reduce((acc, el, index) => {
  return acc + Math.abs(el - lists.list2[index]);
}, 0);

console.log(result);
