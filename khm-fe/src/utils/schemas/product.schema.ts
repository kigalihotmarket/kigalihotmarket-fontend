import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Product Name is required"),
    teaser: z.string().min(1, "Teaser is required"),
    model: z.string().optional(),
    warranty: z.string().min(1, "Warranty is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.string().min(1, "Price is required"),
    discountPercentage: z.coerce.string().min(0, "Discount Percentage is required"),
    category: z.string().min(1, "Category is required"),
    brand: z.string().min(1, "Brand is required"),
    stockQuantity: z.coerce.string().min(0, "Stock Quantity is required"),
    thumbnail: z.any(),
    galleryImages: z.array(z.any()).optional(),
    featuresOne: z.string().optional(),
    featuresTwo: z.string().optional(),
    featuresThree: z.string().optional(),
    featuresFour: z.string().optional(),
    featuresFive: z.string().optional(),
    featuresFix: z.string().optional(),
    featuresSeven: z.string().optional(),
    featuresEight: z.string().optional(),
    featuresNine: z.string().optional(),
    featuresTen: z.string().optional(),
});

