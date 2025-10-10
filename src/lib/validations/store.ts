// src/lib/validations/store.ts
import * as z from "zod";

/**
 * @description Skema validasi untuk form pendaftaran toko.
 */
export const OpenStoreSchema = z.object({
    storeName: z.string().min(3, {
        message: "Nama Toko minimal 3 karakter.",
    }).max(50, {
        message: "Nama Toko maksimal 50 karakter."
    }),
    storeDomain: z.string().min(3, {
        message: "Domain Toko minimal 3 karakter.",
    }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Domain hanya boleh huruf kecil, angka, dan strip (tidak di awal/akhir)."
    }),
    city: z.string().min(2, {
        message: "Kota harus diisi.",
    }),
    postalCode: z.string().length(5, {
        message: "Kode Pos harus 5 digit.",
    }),
    detailAddress: z.string().min(10, {
        message: "Alamat lengkap harus lebih dari 10 karakter.",
    }),
});

/**
 * @description Tipe otomatis dari Zod schema untuk form open store.
 */
export type OpenStoreFormData = z.infer<typeof OpenStoreSchema>;

/**
 * @description Tipe untuk respons API pendaftaran toko.
 */
export type StoreRegisterResponse = {
    success: boolean;
    message: string;
    store: {
        id: number;
        name: string;
        domain: string;
        city: string;
        postal_code: string;
        detail_address: string;
        created_at?: string;
    };
};
