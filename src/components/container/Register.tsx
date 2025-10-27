'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, TRegisterSchema } from '@/lib/validations/auth_validations'; 
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/context/auth_context'; // ✅ Import useAuth

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react'; 
import Image from 'next/image';

const LOGO_PATH = '/Vector.png'; 
const LOGO_SIZE = 24;

// 🔥 Karena dummyjson tidak ada endpoint register, kita buat simulasi.
// Di dunia nyata, Anda akan menggunakan endpoint /auth/register
export default function RegisterForm() {
    const router = useRouter();
    const { login } = useAuth(); // ✅ Ambil fungsi login untuk simulasi
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

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

    // 🔥 useMutation untuk SIMULASI Register
    const registerMutation = useMutation({
        // ✅ Karena tidak ada endpoint register, kita simulasikan dengan delay dan sukses
        mutationFn: async (data: TRegisterSchema) => {
            // SIMULASI API CALL: Tunggu 1 detik
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // SIMULASI SUKSES: Di aplikasi nyata, ini adalah res.data dari /auth/register
            return { success: true }; 
        },
        onSuccess: (data) => {
            toast.success('Pendaftaran berhasil! Silakan Login dengan akun yang Anda daftarkan.');
            form.reset();
            // ✅ Setelah berhasil register, arahkan ke halaman login
            router.push('/01_login'); 
        },
        onError: (error: any) => {
            // Simulasi error jika diperlukan
            toast.error('Pendaftaran gagal, coba lagi.');
            console.error(error);
        },
    });

    // 🔹 Submit handler
    const onSubmit = (data: TRegisterSchema) => {
        registerMutation.mutate(data);
    };

    // ... (Bagian formFields & getInputField tetap sama)
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
                            onClick={() => router.push('/01_login')} 
                            className="cursor-pointer font-semibold text-black hover:text-gray-800"
                        >
                            Log In
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}