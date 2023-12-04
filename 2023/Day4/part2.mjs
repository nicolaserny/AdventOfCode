import { readFileSync } from "node:fs";

const data = readFileSync("./input2.txt").toString().split(/\r?\n/);

function createCard(str) {
  const cardTokens = str.split(":");
  const cardData = cardTokens[1].split("|").map((s) => s.trim());
  return {
    id: parseInt(cardTokens[0].trim().replace("Card ", "")),
    winningNumbers: new Set(
      cardData[0]
        .split(" ")
        .filter((e) => !!e)
        .map((s) => parseInt(s.trim())),
    ),
    numbers: cardData[1]
      .split(" ")
      .filter((e) => !!e)
      .map((s) => parseInt(s.trim())),
  };
}

function computeCardpoints(card) {
  return card.numbers.reduce(
    (acc, v) => (card.winningNumbers.has(v) ? acc + 1 : acc),
    0,
  );
}

let result = 0;
const cardMap = new Map();
const copyStack = [];

// Create initial card map and copy stack
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    const card = createCard(val);
    const points = computeCardpoints(card);
    cardMap.set(card.id, { points, nbOfCards: 1 });
    for (let i = 1; i <= points; i++) {
      copyStack.push(card.id + i);
    }
  }
}

// Process copy cards
while (copyStack.length > 0) {
  const copyCardId = copyStack.pop();
  const card = cardMap.get(copyCardId);
  card.nbOfCards++;
  for (let i = 1; i <= card.points; i++) {
    copyStack.push(copyCardId + i);
  }
}

result = Array.from(cardMap.values()).reduce((acc, v) => acc + v.nbOfCards, 0);

console.log(result);
