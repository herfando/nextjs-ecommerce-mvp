// src/lib/validations/auth.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
});

// Kita juga mengekstrak tipe dari skema untuk digunakan di komponen kita
export type TLoginSchema = z.infer<typeof loginSchema>;