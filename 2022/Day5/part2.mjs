import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

let fileIndex = 0;
let line = data[fileIndex];
let initial = [];
while (line) {
  initial.push(line);
  fileIndex++;
  line = data[fileIndex];
}
initial = initial.reverse();
let stacks = [];
let indexes = [];
for (let i = 0; i < initial[0].length; i++) {
  const e = initial[0];
  if (e[i].match(/[0-9]/)) {
    indexes.push(i);
    stacks.push([]);
  }
}
initial = initial.slice(1);
for (let e of initial) {
  for (let i = 0; i < e.length; i++) {
    if (e[i].match(/[A-Z]/)) {
      const index = indexes.findIndex((e) => e === i);
      stacks[index].push(e[i]);
    }
  }
}

for (let i = fileIndex; i < data.length; i++) {
  if (data[i]) {
    const input = data[i].split(" ");
    const nb = input[1];
    const from = input[3];
    const to = input[5];
    let tmp = [];
    for (let j = 0; j < nb; j++) {
      const el = stacks[from - 1].pop();
      tmp.push(el);
    }
    tmp = tmp.reverse();
    stacks[to - 1].push(...tmp);
  }
}

const res = stacks.map((el) => el[el.length - 1]);
console.log(res.join(""));
