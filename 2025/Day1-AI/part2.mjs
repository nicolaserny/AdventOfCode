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
let totalClicksAtZero = 0;

// Helper function to count how many times we hit 0 during a rotation
function countZerosDuringRotation(startPos, direction, distance) {
  // Optimized: instead of simulating each click, calculate mathematically
  
  // How many complete circles (each passes through 0 exactly once)?
  const completeCircles = Math.floor(distance / DIAL_SIZE);
  let count = completeCircles;
  
  // For the partial rotation (remainder after complete circles)
  const partialDistance = distance % DIAL_SIZE;
  
  if (partialDistance > 0) {
    if (direction === "R") {
      // Moving right: we hit 0 if we wrap around (startPos + partialDistance >= DIAL_SIZE)
      const endPos = startPos + partialDistance;
      if (endPos >= DIAL_SIZE) {
        count++;
      }
    } else {
      // Moving left: we hit 0 if we wrap around
      // We pass through 0 if we end at or below 0 (wrapping), but only if we didn't start at 0
      const endPos = startPos - partialDistance;
      if (endPos <= 0 && startPos != 0) {
        count++;
      }
      // If startPos == 0, we move away from 0 immediately (to 99), so we don't count it
      // unless we do a full circle, which is already counted in completeCircles
    }
  }
  
  return count;
}

// Process each rotation
for (const { direction, distance } of rotations) {
  const clicksAtZero = countZerosDuringRotation(position, direction, distance);
  totalClicksAtZero += clicksAtZero;
  
  // Update position
  if (direction === "R") {
    position = (position + distance) % DIAL_SIZE;
  } else {
    position = ((position - distance) % DIAL_SIZE + DIAL_SIZE) % DIAL_SIZE;
  }
}

// Output the result
console.log(totalClicksAtZero);
