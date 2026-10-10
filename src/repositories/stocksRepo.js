import { AppError } from "../errors/AppError.js";

const stocks = [
  { id: 1, sym: "AMZ", price: 50 },
  { id: 2, sym: "APPL", price: 150 },
  { id: 3, sym: "SP500", price: 450 },
  { id: 4, sym: "ADA", price: 75 },
];

export function retreivePrice(sym) {
  const share = stocks.find((item) => item.sym === sym);
  if (!share) {
    throw new AppError("Stock not found", 404);
  }
  return share;
}

const inventory = [];

export function addToInventory(sym, quantity) {
  const item = inventory.find((share) => share.sym === sym);

  if (item) {
    item.numberOfShares += quantity;
  } else {
    inventory.push({ id: inventory.length + 1, numberOfShares: quantity, sym });
  }

  return inventory;
}
