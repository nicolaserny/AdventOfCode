import { readFileSync } from "node:fs";

const data = readFileSync("./input1.txt").toString().split(/\r?\n/);

function createHand(rawStr) {
  const parsedStr = rawStr.split(" ");
  return {
    cards: parsedStr[0].trim().split(""),
    bid: parseInt(parsedStr[1].trim()),
  };
}

const hands = [];
// create hands from input file
for (let i = 0; i < data.length; i++) {
  const val = data[i];
  if (val) {
    hands.push(createHand(val));
  }
}

function getCardValue(card) {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
    default:
      return parseInt(card);
  }
}

function getHandValue(hand) {
  const convertedCards = hand.cards.map((card) => getCardValue(card));
  const basicValue = parseInt(
    convertedCards.reduce(
      (acc, cardValue) => acc + cardValue.toString().padStart(2, "0"),
      "",
    ),
  );
  const cardMap = convertedCards.reduce((acc, cardValue) => {
    if (acc.has(cardValue)) {
      acc.set(cardValue, acc.get(cardValue) + 1);
    } else {
      acc.set(cardValue, 1);
    }
    return acc;
  }, new Map());
  const mapValuesArray = Array.from(cardMap.values());
  if (mapValuesArray.some((v) => v === 5)) {
    return {
      value: 1000,
      basicValue,
    };
  }
  if (mapValuesArray.some((v) => v === 4)) {
    return {
      value: 100,
      basicValue,
    };
  }
  if (
    mapValuesArray.some((v) => v === 3) &&
    mapValuesArray.some((v) => v === 2)
  ) {
    return {
      value: 50,
      basicValue,
    };
  }
  if (mapValuesArray.some((v) => v === 3)) {
    return {
      value: 25,
      basicValue,
    };
  }
  if (mapValuesArray.filter((v) => v === 2).length === 2) {
    return {
      value: 10,
      basicValue,
    };
  }
  if (mapValuesArray.filter((v) => v === 2).length === 1) {
    return {
      value: 5,
      basicValue,
    };
  }
  return {
    value: 0,
    basicValue,
  };
}

function compareHand(hand1, hand2) {
  if (hand1.value > hand2.value) {
    return 1;
  } else if (hand1.value < hand2.value) {
    return -1;
  } else {
    if (hand1.basicValue > hand2.basicValue) {
      return 1;
    } else if (hand1.basicValue < hand2.basicValue) {
      return -1;
    } else {
      return 0;
    }
  }
}

// sort hands by value
const sortedHands = hands
  .map((hand) => ({ ...hand, ...getHandValue(hand) }))
  .sort((a, b) => compareHand(a, b));

const winnings = sortedHands.reduce((acc, hand, index) => {
  const winnings = (index + 1) * hand.bid;
  return acc + winnings;
}, 0);

console.log(winnings);
