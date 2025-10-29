// src/redux/detailSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface DetailProduct {
    id: number;
    title: string;
    description: string;
    price?: number;
    thumbnail: string;
    images?: string[];
    category: string;
    rating: number;
}

interface DetailState {
    item: DetailProduct | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: DetailState = {
    item: null,
    isLoading: false,
    error: null,
};

// 🟢 Fetch detail product dari API dummyjson
export const fetchProductDetail = createAsyncThunk(
    "detail/fetchProductDetail",
    async (id: number) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch detail");
        return await res.json();
    }
);

const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        clearDetail: (state) => {
            state.item = null;
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.item = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.error = action.error.message || "Failed to load detail";
                state.isLoading = false;
            });
    },
});

export const { clearDetail } = detailSlice.actions;
export default detailSlice.reducer;
