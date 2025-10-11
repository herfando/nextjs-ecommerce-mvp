'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// ✅ Import skema dan tipe baru
import { registerSchema, TRegisterSchema } from '@/lib/validations/auth_validations'; 
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react'; 
// Import Image dan atur LOGO_PATH seperti yang kita bahas sebelumnya
import Image from 'next/image';

const LOGO_PATH = '/Vector.png'; // Sesuaikan dengan path logo kamu
const LOGO_SIZE = 24;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ State untuk Confirm Password

  // 🔹 Setup form dengan zodResolver
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 🔥 useMutation dari TanStack Query
  const registerMutation = useMutation({
    mutationFn: async (data: TRegisterSchema) => {
      // ✅ Endpoint untuk register/signup biasanya berbeda
      const res = await api.post('/auth/register', data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Pendaftaran berhasil! Silakan Login.');

      // ✅ Setelah berhasil register, arahkan ke halaman login
      form.reset();
      router.push('/auth/login'); 
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Pendaftaran gagal, coba lagi.';
      toast.error(message);
      console.error(error);
    },
  });

  // 🔹 Submit handler
  const onSubmit = (data: TRegisterSchema) => {
    registerMutation.mutate(data);
  };

  const formFields: Array<{ name: keyof TRegisterSchema, type: string, placeholder: string }> = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'phone', type: 'tel', placeholder: 'Number Phone' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
  ];

  const getInputField = (field: typeof formFields[0]) => {
    const isPasswordField = field.name === 'password';
    const isConfirmPasswordField = field.name === 'confirmPassword';
    const isVisible = isPasswordField ? showPassword : (isConfirmPasswordField ? showConfirmPassword : true);
    const toggleVisibility = isPasswordField ? () => setShowPassword(!showPassword) : () => setShowConfirmPassword(!showConfirmPassword);

    return (
      <div key={field.name}>
        <div className="relative">
          <Input
            type={isVisible ? 'text' : field.type}
            id={field.name}
            placeholder={field.placeholder}
            className="h-11 px-3 py-2 border border-gray-300 rounded-lg text-sm focus-visible:ring-offset-0 focus-visible:ring-black pr-10"
            {...form.register(field.name)}
          />
          {(isPasswordField || isConfirmPasswordField) && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label={`Toggle visibility of ${field.placeholder}`}
            >
              {isVisible ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {/* Error Text Helper */}
        {form.formState.errors[field.name] && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors[field.name]?.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm rounded-xl shadow-lg border-none bg-white">
        <CardContent className="p-8">
          
          {/* Logo dan Judul */}
          <div className="flex items-center mb-6">
            <div className="mr-2">
                <Image
                    src={LOGO_PATH}
                    alt="Shirt Logo"
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                />
            </div>
            <span className="text-xl font-semibold text-black">Shirt</span>
          </div>

          <h1 className="text-2xl font-bold mb-1 text-black">Register</h1>
          <p className="text-sm text-gray-500 mb-6">
            Just a few steps away from your next favorite purchase
          </p>

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Render semua fields */}
            {formFields.map(field => getInputField(field))}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full mt-2 h-11 bg-black text-white hover:bg-gray-800 rounded-lg text-base font-medium"
            >
              {registerMutation.isPending ? 'Loading...' : 'Submit'}
            </Button>
          </form>

          {/* Teks "Already have an account? Log In" */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/auth/login')} 
              className="font-semibold text-black hover:text-gray-800"
            >
              Log In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}