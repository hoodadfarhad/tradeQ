import { buyNewStocks } from "../Service/stocksService.js";

export async function buyStocks(req, res, next) {
  try {
    const { symbol, quantity } = req.body;
    const { new_balance, new_inventory } = await buyNewStocks(symbol, quantity);

    res.status(201).json({
      message: `${quantity} shares of ${symbol} have been added to your wallet`,
      balance: new_balance,
      inventory: new_inventory,
    });
  } catch (error) {
    next(error);
  }
}
