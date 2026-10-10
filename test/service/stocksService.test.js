import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../src/repositories/accountRepo.js", () => ({
  deductFunds: jest.fn(),
}));

jest.unstable_mockModule("../../src/repositories/stocksRepo.js", () => ({
  addToInventory: jest.fn(),
  retreivePrice: jest.fn(),
}));

jest.unstable_mockModule("../../src/Service/fundsService.js", () => ({
  getAccount: jest.fn(),
}));

// Import modules only AFTER registering the mocks.
const { buyNewStocks } = await import("../../src/Service/stocksService.js");

const { deductFunds } = await import("../../src/repositories/accountRepo.js");
const { addToInventory, retreivePrice } = await import(
  "../../src/repositories/stocksRepo.js"
);
const { getAccount } = await import("../../src/Service/fundsService.js");

const mockDeductFunds = jest.mocked(deductFunds);
const mockAddToInventory = jest.mocked(addToInventory);
const mockRetrievePrice = jest.mocked(retreivePrice);
const mockGetAccount = jest.mocked(getAccount);

describe("buyNewStocks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("buys stocks when the account has enough funds", async () => {
    mockRetrievePrice.mockReturnValue({
      id: 1,
      sym: "AAPL",
      price: 50,
    });

    mockGetAccount.mockResolvedValue(500);
    mockDeductFunds.mockResolvedValue(400);
    mockAddToInventory.mockReturnValue([
      { id: 1, sym: "AAPL", numberOfShares: 2 },
    ]);

    const result = await buyNewStocks("AAPL", 2);

    expect(mockRetrievePrice).toHaveBeenCalledWith("AAPL");
    expect(mockGetAccount).toHaveBeenCalled();
    expect(mockDeductFunds).toHaveBeenCalledWith(100);
    expect(mockAddToInventory).toHaveBeenCalledWith("AAPL", 2);

    expect(result).toEqual({
      new_balance: 400,
      new_inventory: [
        { id: 1, sym: "AAPL", numberOfShares: 2 },
      ],
    });
  });

  test("throws when the account has insufficient funds", async () => {
    mockRetrievePrice.mockReturnValue({
      id: 1,
      sym: "AAPL",
      price: 50,
    });

    mockGetAccount.mockResolvedValue(50);

    await expect(buyNewStocks("AAPL", 2)).rejects.toThrow(
      "Insufficient funds!"
    );

    expect(mockDeductFunds).not.toHaveBeenCalled();
    expect(mockAddToInventory).not.toHaveBeenCalled();
  });
});