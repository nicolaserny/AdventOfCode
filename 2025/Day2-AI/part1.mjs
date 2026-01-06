import { readFileSync } from "node:fs";

// Helper function to check if a number is invalid
function isInvalid(num) {
  const str = num.toString();
  if (str.length % 2 !== 0) return false;
  
  const mid = str.length / 2;
  const firstHalf = str.slice(0, mid);
  const secondHalf = str.slice(mid);
  
  // No leading zeroes and both halves match
  return firstHalf[0] !== '0' && firstHalf === secondHalf;
}

// Read and parse input
const data = readFileSync("./input1.txt").toString().trim();
const ranges = data.split(',').map(r => r.trim());

let sum = 0;

// Process each range
for (const range of ranges) {
  const [start, end] = range.split('-').map(Number);
  
  for (let num = start; num <= end; num++) {
    if (isInvalid(num)) {
      sum += num;
    }
  }
}

console.log(sum);