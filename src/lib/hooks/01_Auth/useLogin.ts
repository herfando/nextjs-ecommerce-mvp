import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import { TLoginSchema } from '@/lib/validations/auth_validations';

export function useLogin() {
    return useMutation({
        mutationFn: async (data: TLoginSchema) => {
            const res = await api.post('/auth/login', data);
            return res.data; // hasil API (token dsb)
        },
    });
}
