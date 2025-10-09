'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/lib/validations/auth';
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth_context'; // ✅ pakai Context
import { useRouter } from 'next/navigation'; // ✅ redirect setelah login

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ ambil fungsi login dari Context

  // 🔹 Setup form dengan zodResolver
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 🔥 useMutation dari TanStack Query
  const loginMutation = useMutation({
    mutationFn: async (data: TLoginSchema) => {
      const res = await api.post('/auth/login', data);
      return res.data; // diasumsikan API mengembalikan { token, email, ... }
    },
    onSuccess: (data) => {
      toast.success('Login berhasil 🎉');

      // ✅ Simpan ke context (dan bisa juga ke localStorage)
      login({ email: data.email, token: data.token });

      // ✅ Reset form
      form.reset();

      // ✅ Arahkan ke dashboard (opsional)
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login gagal, coba lagi.';
      toast.error(message);
      console.error(error);
    },
  });

  // 🔹 Submit handler
  const onSubmit = (data: TLoginSchema) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md"
    >
      {/* Email Field */}
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="you@example.com"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full"
      >
        {loginMutation.isPending ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
