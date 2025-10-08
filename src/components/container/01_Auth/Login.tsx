'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/lib/validations/auth';
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 🔥 Gunakan TanStack useMutation
  const loginMutation = useMutation({
    mutationFn: async (data: TLoginSchema) => {
      const res = await api.post('/auth/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Login berhasil 🎉');
      console.log('Token:', data.token);
      form.reset();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Login gagal, coba lagi.';
      toast.error(message);
      console.error(error);
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md"
    >
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
