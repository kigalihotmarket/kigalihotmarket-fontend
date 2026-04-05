import { z } from "zod";

export const transactionSchema = z.object({
  type: z.string({
    required_error: "Type is required",
  }),
  amount: z.coerce
    .number({
      required_error: "Amount is required",
    })
    .min(0.1, "Amount must be greater than 0"),
  reference: z.string({
    required_error: "Reference is required",
  }),
  reason: z.string({
    required_error: "Reason is required",
  }),
  customerName: z.string({
    required_error: "Customer Name is required",
  }),
  customerPhone: z.string().optional(),
  payedAmount: z.coerce.number().optional(),
  dueDate: z.string().nullable().optional(),
  payedAt: z.string().nullable().optional(),
});

export const paymentSchema = z.object({
  payedAmount: z.coerce.number().optional(),
  payedAt: z.string().nullable().optional(),
});
