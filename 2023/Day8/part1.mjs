import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

const commands = data[0].split("").filter((s) => !!s);
// Create network
const network = new Map();
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (row) {
    const [source, destination] = row.split("=").map((s) => s.trim());
    const [left, right] = destination
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim());
    network.set(source, { left, right });
  }
}

// Network traversal
let found = false;
let steps = 0;
let currentNode = network.get("AAA");
let currentCommandIndex = 0;
while (!found) {
  const currentCommand = commands[currentCommandIndex];
  let nextNodeValue = undefined;
  if (currentCommand === "L") {
    nextNodeValue = currentNode.left;
  } else {
    nextNodeValue = currentNode.right;
  }
  steps++;
  if (nextNodeValue === "ZZZ") {
    found = true;
  }
  currentNode = network.get(nextNodeValue);
  if (currentCommandIndex === commands.length - 1) {
    currentCommandIndex = 0;
  } else {
    currentCommandIndex++;
  }
}

console.log(steps);
