import { AppError } from "../errors/AppError.js";
import { deductFunds } from "../repositories/accountRepo.js";
import { addToInventory, retreivePrice } from "../repositories/stocksRepo.js";
import { getAccount } from "./fundsService.js";

export async function buyNewStocks(sym, quantity) {
  const price = getPrice(sym);
  const cost = price * quantity;
  const balance = await getAccount();

  if (balance < cost) {
    throw new AppError("Insufficient funds!", 400);
  }

  const new_balance = await deductFunds(cost);
  const new_inventory = addToInventory(sym, quantity);
  return { new_balance, new_inventory };
}

function getPrice(sym) {
  const data = retreivePrice(sym);
  if (data.sym !== sym) {
    throw new AppError("Internal mismatch!", 500);
  }
  return data.price;
}
