import { z } from "zod";

export const depositSchema = z.object({
  amount: z.number().finite().positive(),
  currency: z.string().min(1),
});
