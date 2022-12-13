import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

const root = {
  name: "/",
  files: [],
  directories: [],
  parent: undefined,
};
let current = root;
for (let i = 0; i < data.length; i++) {
  const el = data[i].trim();
  if (el) {
    if (el.startsWith("$")) {
      // command
      const vals = el.split(" ");
      const command = vals[1];
      switch (command) {
        case "cd":
          const dir = vals[2];
          if (dir === "/") {
            current = root;
          } else {
            if (dir === "..") {
              current = current.parent;
            } else {
              const dirIndex = current.directories.findIndex((e) => e === dir);
              if (dirIndex >= 0) {
                current = current.directories[dirIndex];
              } else {
                const newDir = {
                  name: dir,
                  files: [],
                  directories: [],
                  parent: current,
                };
                current.directories.push(newDir);
                current = newDir;
              }
            }
          }
          break;
        case "ls":
          break;
      }
    } else {
      const vals = el.split(" ");
      if (vals[0] !== "dir") {
        const file = {
          name: vals[1],
          size: +vals[0],
        };
        if (current.files.findIndex((e) => e.name === file.name) < 0) {
          current.files.push(file);
        }
      }
    }
  }
}
function print(node) {
  console.log(node.name, node.files.map((e) => e.name).join(","));
  console.log(">");
  node.directories.forEach((e) => print(e));
}

const res = [];
function compute(node) {
  const subDirSize = node.directories.reduce((acc, e) => acc + compute(e), 0);
  const dirSize = node.files.reduce((acc, e) => acc + e.size, 0);
  res.push({ name: node.name, size: subDirSize + dirSize });
  return subDirSize + dirSize;
}
compute(root);

const requiredSpace =
  30000000 - (70000000 - res.find((e) => e.name === "/").size);
console.log(requiredSpace);
res.sort((a, b) => a.size - b.size);
const indexToDelete = res.findIndex((e) => e.size >= requiredSpace);
console.log(res[indexToDelete]);
