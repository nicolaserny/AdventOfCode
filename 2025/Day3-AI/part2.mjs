import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

function findMaxJoltage(bank, numBatteries = 12) {
  if (bank.length < numBatteries) return BigInt(0);
  
  let result = "";
  let startPos = 0;
  
  // For each position in the result (0 to numBatteries-1)
  for (let i = 0; i < numBatteries; i++) {
    let maxDigit = -1;
    let maxPos = -1;
    
    // Find the largest digit in the valid range
    // Valid range: from startPos to (bank.length - (numBatteries - i))
    // This ensures we have enough digits left to complete the result
    const endPos = bank.length - (numBatteries - i);
    
    for (let j = startPos; j <= endPos; j++) {
      const digit = parseInt(bank[j]);
      if (digit > maxDigit) {
        maxDigit = digit;
        maxPos = j;
      }
    }
    
    result += maxDigit;
    startPos = maxPos + 1;
  }
  
  return BigInt(result);
}

let totalJoltage = BigInt(0);

for (const bank of data) {
  if (bank.trim().length === 0) continue;
  const maxJoltage = findMaxJoltage(bank);
  totalJoltage += maxJoltage;
}

console.log("Total output joltage:", totalJoltage.toString());
