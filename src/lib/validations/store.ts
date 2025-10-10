// src/lib/validation/store.ts

import * as z from 'zod';

/**
 * @description Skema validasi untuk form pendaftaran toko.
 */
export const OpenStoreSchema = z.object({
    storeName: z.string().min(3, {
        message: 'Nama Toko minimal 3 karakter.',
    }).max(50, {
        message: 'Nama Toko maksimal 50 karakter.'
    }),
    storeDomain: z.string().min(3, {
        message: 'Domain Toko minimal 3 karakter.',
    }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Domain hanya boleh huruf kecil, angka, dan strip (tidak di awal/akhir).'
    }),
    city: z.string().min(2, {
        message: 'Kota harus diisi.',
    }),
    postalCode: z.string().min(5, {
        message: 'Kode Pos tidak valid (harus 5 digit).',
    }).max(5, {
        message: 'Kode Pos tidak valid (harus 5 digit).',
    }),
    detailAddress: z.string().min(10, {
        message: 'Alamat lengkap harus lebih dari 10 karakter.',
    }),
});