import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

function findMaxJoltage(bank) {
  if (bank.length < 2) return 0;
  
  let maxJoltage = 0;
  
  // Try all pairs of batteries (i, j) where i < j
  for (let i = 0; i < bank.length - 1; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      // Form a two-digit number from digits at positions i and j
      const joltage = parseInt(bank[i] + bank[j]);
      maxJoltage = Math.max(maxJoltage, joltage);
    }
  }
  
  return maxJoltage;
}

let totalJoltage = 0;

for (const bank of data) {
  if (bank.trim().length === 0) continue;
  const maxJoltage = findMaxJoltage(bank);
  totalJoltage += maxJoltage;
}

console.log("Total output joltage:", totalJoltage);
