import { z } from "zod";

export const cartItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1, "Jumlah minimal 1"),
});

export type TCartItem = z.infer<typeof cartItemSchema>;
