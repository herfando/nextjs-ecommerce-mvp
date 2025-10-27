'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/lib/validations/auth_validations';
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
// ✅ Perhatikan import useAuth yang sudah diperbarui
import { useAuth } from '@/lib/context/auth_context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react'; 

const LOGO_PATH = '/Vector.png';
const LOGO_SIZE = 24;

export default function LoginForm() {
    const router = useRouter();
    // ✅ Dapatkan fungsi login dari context
    const { login, user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    // 🔹 Setup form dengan zodResolver
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 🔥 useMutation untuk Login dengan DummyJSON
    const loginMutation = useMutation({
        mutationFn: async (data: TLoginSchema) => {
            // ✅ Dummyjson hanya menggunakan username dan password untuk login
            // Kita akan asumsikan email yang diinput adalah username
            const res = await api.post('https://dummyjson.com/auth/login', {
                username: data.email, // Menggunakan email sebagai username
                password: data.password,
            });
            return res.data;
        },

        onSuccess: (data) => {
            toast.success('Login berhasil 🎉');
            // ✅ Panggil fungsi login dari context dengan data API
            login(data);
            form.reset();
            
            // ✅ Arahkan ke /home. Navbar akan otomatis berubah.
            router.push('/'); 
        },
        onError: (error: any) => {
            // Dummyjson memberikan error di response.data.message
            const message = error.response?.data?.message || 'Login gagal, pastikan email/username dan password benar.';
            toast.error(message);
            console.error(error);
        },
    });

    // 🔹 Submit handler
    const onSubmit = (data: TLoginSchema) => {
        // Dummy: Ganti email dengan username
        // Misalnya, user default: kminchelle / 0lelplR
        loginMutation.mutate(data);
    };

    // ... (Bagian return tidak ada perubahan styling)
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-sm rounded-xl shadow-lg border-none bg-white">
                <CardContent className="p-8">
                    
                    {/* Logo dan Judul */}
                    <div className="flex items-center mb-6">
                        <Image 
                            src={LOGO_PATH} 
                            alt="Shirt Logo" 
                            width={LOGO_SIZE} 
                            height={LOGO_SIZE} 
                            className="mr-2" 
                        />
                        <span className="text-xl font-semibold text-black">Shirt</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-1 text-black">Login</h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Access your account and start shopping in seconds
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        {/* Email Field */}
                        <div>
                            <Input
                                type="text" // Ganti ke text karena kita anggap ini username dummyjson
                                id="email"
                                placeholder="Username (ex: kminchelle)" // Ganti placeholder
                                className="h-11 px-3 py-2 border border-gray-300 rounded-lg text-sm focus-visible:ring-offset-0 focus-visible:ring-black"
                                {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password (ex: 0lelplR)" // Ganti placeholder
                                className="h-11 px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus-visible:ring-offset-0 focus-visible:ring-black"
                                {...form.register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
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
                            className="w-full mt-2 h-11 bg-black text-white hover:bg-gray-800 rounded-lg text-base font-medium"
                        >
                            {loginMutation.isPending ? 'Loading...' : 'Login'}
                        </Button>
                    </form>

                    {/* Teks "Don't have an account?" */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <button
                            onClick={() => router.push('/02_register')} 
                            className="cursor-pointer font-semibold text-black hover:text-gray-800"
                        >
                            Register
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}