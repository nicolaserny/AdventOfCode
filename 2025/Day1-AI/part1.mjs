import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

// Parse the input data
const rotations = data
  .filter((line) => line.trim() !== "")
  .map((line) => {
    const direction = line[0]; // 'L' or 'R'
    const distance = parseInt(line.slice(1));
    return { direction, distance };
  });

// The dial goes from 0 to 99
const DIAL_SIZE = 100;
let position = 50; // Starting position
let countAtZero = 0;

// Process each rotation
for (const { direction, distance } of rotations) {
  if (direction === "R") {
    // Rotate right (toward higher numbers)
    position = (position + distance) % DIAL_SIZE;
  } else {
    // Rotate left (toward lower numbers)
    // Add DIAL_SIZE before modulo to handle negative numbers correctly
    position = ((position - distance) % DIAL_SIZE + DIAL_SIZE) % DIAL_SIZE;
  }
  
  // Check if we landed on 0
  if (position === 0) {
    countAtZero++;
  }
}

// Output the result
console.log(countAtZero);
