import { describe, expect, test } from "@jest/globals";
import { buyStockSchema } from "../../src/schemas/stockSchemas.js";

describe("buyStockSchema", () => {
  test("accepts valid input and normalizes symbol", () => {
    const result = buyStockSchema.safeParse({
      symbol: " appl ",
      quantity: 2,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        symbol: "APPL",
        quantity: 2,
      });
    }
  });

  test("rejects zero quantity", () => {
    const result = buyStockSchema.safeParse({
      symbol: "AAPL",
      quantity: 0,
    });

    expect(result.success).toBe(false);
  });

  test("rejects fractional quantity", () => {
    const result = buyStockSchema.safeParse({
      symbol: "AAPL",
      quantity: 2.5,
    });

    expect(result.success).toBe(false);
  });
});