import { readFileSync } from "node:fs";

// Helper function to check if a number is invalid (pattern repeated at least twice)
function isInvalid(num) {
  const str = num.toString();
  const len = str.length;
  
  // Try all possible pattern lengths (from 1 to half the string length)
  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    // Check if the length is divisible by pattern length (must repeat evenly)
    if (len % patternLen !== 0) continue;
    
    const pattern = str.slice(0, patternLen);
    
    // No leading zeroes
    if (pattern[0] === '0') continue;
    
    // Check if the entire string is this pattern repeated
    const repetitions = len / patternLen;
    if (pattern.repeat(repetitions) === str) {
      return true;
    }
  }
  
  return false;
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