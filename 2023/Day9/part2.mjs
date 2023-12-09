import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

function lagrangeBasis(x, xi, otherPoints) {
  return otherPoints.reduce(
    (acc, point) => (acc * (x - point.x)) / (xi - point.x),
    1,
  );
}

function lagrangePolynomial(x, points) {
  let result = 0;
  points.forEach((point) => {
    let basis = lagrangeBasis(
      x,
      point.x,
      points.filter((p) => p !== point),
    );
    result += basis * point.y;
  });
  return Math.round(result);
}

function lagrandeExtrapolation(row) {
  const dataPoints = row
    .split(" ")
    .reverse()
    .map((s, i) => ({ x: i + 1, y: parseInt(s.trim()) }));
  return lagrangePolynomial(dataPoints.length + 1, dataPoints);
}

let result = 0;
for (let row of data) {
  if (row) {
    result += lagrandeExtrapolation(row);
  }
}

console.log(result);
