import { z } from "zod";

const symbolSchema = z.string().trim().min(1).max(10).transform((symbol) => symbol.toUpperCase());
const quantitySchema = z.number().int().positive();

export const buyStockSchema = z.object({
  symbol: symbolSchema,
  quantity: quantitySchema,
});
