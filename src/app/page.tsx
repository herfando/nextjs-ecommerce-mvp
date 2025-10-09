// app/page.tsx
// File ini akan menangani route default (http://localhost:3000/)

import { redirect } from 'next/navigation';

export default function RootPage() {
  // ✅ Panggil fungsi redirect() dari Next.js
  // Ini akan mengalihkan pengguna dari '/' ke '/auth/login'
  redirect('/auth/login');
  
  // Karena sudah di-redirect, kode di bawah ini tidak akan pernah dijangkau
  // Anda bisa mengembalikan null atau fragment kosong.
  return null; 
}