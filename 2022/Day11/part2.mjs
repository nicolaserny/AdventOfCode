import { readFileSync } from "node:fs";

const data = readFileSync("./input.txt").toString().split(/\r?\n/);

const monkeys = [];
for (let i = 0; i < data.length; i = i + 7) {
  const name = data[i].split(":")[0];
  const items = data[i + 1]
    .split(":")[1]
    .split(",")
    .map((e) => +e);
  const operation = data[i + 2]
    .split(":")[1]
    .split("=")[1]
    .split(" ")
    .filter((e) => Boolean(e));
  const test = data[i + 3].split(" ").filter((e) => Boolean(e));
  const testTrue = data[i + 4].split("to").filter((e) => Boolean(e));
  const testFalse = data[i + 5].split("to ").filter((e) => Boolean(e));
  monkeys.push({
    name,
    items,
    operation: { x: operation[0], operator: operation[1], y: operation[2] },
    test: {
      divisibleBy: +test[3],
      true: testTrue[1].trim(),
      false: testFalse[1].trim(),
    },
    inspects: 0,
  });
}
const rounds = 10000;

function executeOperation(op, worryLevel) {
  const getValue = (val) => (val === "old" ? worryLevel : +val);
  switch (op.operator) {
    case "+":
      return getValue(op.x) + getValue(op.y);
    case "-":
      return getValue(op.x) - getValue(op.y);
    case "/":
      return getValue(op.x) / getValue(op.y);
    case "*":
      return getValue(op.x) * getValue(op.y);
  }
}

const coeff = monkeys.reduce((acc, e) => acc * e.test.divisibleBy, 1);

for (let i = 0; i < rounds; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const monkey = monkeys[j];
    monkey.inspects = monkey.inspects + monkey.items.length;
    for (let k = 0; k < monkey.items.length; k++) {
      let worry = executeOperation(monkey.operation, monkey.items[k]);
      const monkeyIndex = monkeys.findIndex(
        (e) =>
          e.name.toLowerCase() ===
          (worry % monkey.test.divisibleBy === 0
            ? monkey.test.true
            : monkey.test.false)
      );
      if (monkeyIndex >= 0) {
        monkeys[monkeyIndex].items.push(worry % coeff);
      } else {
        console.error("unexpected", worry, monkey.test.true);
      }
    }
    monkey.items = [];
  }
}
const inspectedTimes = monkeys.map((e) => e.inspects).sort((a, b) => b - a);
const monkeyBusiness = inspectedTimes[0] * inspectedTimes[1];
console.log(monkeyBusiness);
