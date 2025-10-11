import { z } from "zod";

// Schema validasi Zod
export const storeSchema = z.object({
    storeName: z.string().min(2, "Store name must be at least 2 characters"),
    storeDomain: z.string().min(3, "Store domain is required"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(4, "Postal code must be valid"),
    address: z.string().min(5, "Detail address is required"),
});

// TypeScript type otomatis dari schema
export type StoreFormValues = z.infer<typeof storeSchema>;
