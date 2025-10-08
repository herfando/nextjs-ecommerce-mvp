// src/components/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/lib/validations/auth';
import api from '@/lib/api/apiClient';
import { useState } from 'react';

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    setServerError(null);
    try {
      const response = await api.post('/auth/login', data);
      alert(`Login Berhasil! Token: ${response.data.token}`);
      reset(); // Kosongkan form setelah sukses
    } catch (error: any) {
      // Tangani error yang dikirim dari API route kita
      const message = error.response?.data?.message || 'Login gagal, coba lagi.';
      setServerError(message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md">
      {serverError && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">{serverError}</p>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Password</label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}