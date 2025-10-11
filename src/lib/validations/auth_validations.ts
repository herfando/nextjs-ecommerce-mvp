// src/lib/validations/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

// Kita juga mengekstrak tipe dari skema untuk digunakan di komponen kita
export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(1, 'Nama lengkap wajib diisi.'),
        // Nomor telepon (contoh validasi minimal 10 digit, hanya angka)
        phone: z.string().regex(/^[0-9]+$/, 'Nomor telepon hanya boleh angka.').min(10, 'Nomor telepon minimal 10 digit.'),
        email: z.string().email('Email tidak valid.'),
        password: z.string().min(8, 'Password minimal 8 karakter.'),
        confirmPassword: z.string().min(8, 'Konfirmasi Password wajib diisi.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Konfirmasi password tidak cocok.',
        path: ['confirmPassword'], // Tampilkan error di field confirmPassword
    });

export type TRegisterSchema = z.infer<typeof registerSchema>;