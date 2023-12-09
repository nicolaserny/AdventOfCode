import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

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

function getSteps(node) {
  let found = false;
  let steps = 0;
  let currentNode = node;
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
    if (nextNodeValue.endsWith("Z")) {
      found = true;
    }
    currentNode = network.get(nextNodeValue);
    if (currentCommandIndex === commands.length - 1) {
      currentCommandIndex = 0;
    } else {
      currentCommandIndex++;
    }
  }
  return steps;
}

let currentNodes = [...network.keys()]
  .filter((k) => k.endsWith("A"))
  .map((k) => network.get(k));

const stepsForEachRoute = currentNodes.map((n) => getSteps(n));

// Find LCM of all steps
const result = stepsForEachRoute.reduce((acc, val) => lcm(acc, val), 1);

console.log(result);
