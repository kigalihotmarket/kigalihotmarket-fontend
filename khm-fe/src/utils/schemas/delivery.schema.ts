import { z } from "zod";


export const deliverySchema = z.object({
    customerFirstName: z.string().min(1, "firstName is required"),
    customerLastName: z.string().min(1, "lastName is required"),
    customerEmail: z.string().email("Invalid email"),
    customerPhone: z.string().min(10, "Invalid phone number"),
    customerNote: z.string().optional(),
    deliveredAt: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    deliveryStatus: z.string().optional(),
    estimatedDate: z.string().optional(),
});

