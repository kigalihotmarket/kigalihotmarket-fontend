import { z } from "zod";


export const orderSchema = z.object({
    orderItems: z.array(
        z.object({
            productId: z.string().min(1, "Product required"),
            quantity: z.string().min(1, "Quantity required"),
        })
    ),
});


export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product required"),
  quantity: z.string().min(1, "Quantity required"),
});

