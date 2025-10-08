import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const rawBase = process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-api-production-26ab.up.railway.app/";
const baseURL = rawBase.replace(/\/+$/, ""); // hapus trailing slash

export const apiClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    timeout: 10000, // 10s
    withCredentials: false, // ubah ke true kalau butuh cookie auth cross-site
});

// Request interceptor: attach Bearer token jika ada (hanya di browser)
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token"); // atau ambil dari cookie
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor: contoh penanganan error global (401 refresh, logging)
apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // contoh: lakukan refresh token flow di sini (opsional)
            // return refreshAndRetry(error);
        }
        // bisa tambah logging atau transformasi error
        return Promise.reject(error);
    }
);

export default apiClient;
