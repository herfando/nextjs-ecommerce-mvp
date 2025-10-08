// src/services/auth.ts
import { apiClient } from "@/lib/api/apiClient";
import { APIConfiguration } from "@/config/api.config";

export const auth = {
    buyerLogin: async (payload: { email: string; password: string }) => {
        const res = await apiClient.post(APIConfiguration.auth.buyer.login, payload);
        return res.data;
    },

    buyerRegister: async (payload: { name: string; email: string; password: string }) => {
        const res = await apiClient.post(APIConfiguration.auth.buyer.register, payload);
        return res.data;
    },

    sellerLogin: async (payload: { email: string; password: string }) => {
        const res = await apiClient.post(APIConfiguration.auth.seller.login, payload);
        return res.data;
    },

    sellerRegister: async (payload: { name: string; email: string; password: string }) => {
        const res = await apiClient.post(APIConfiguration.auth.seller.register, payload);
        return res.data;
    },
};
