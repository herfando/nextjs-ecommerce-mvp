import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image: string;
}

interface CartState {
    items: CartItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CartState = {
    items: [],
    status: "idle",
};


export const fetchCartFromAPI = createAsyncThunk("cart/fetchCart", async () => {
    const res = await fetch("https://dummyjson.com/products?limit=5");
    const data = await res.json();
    return data.products.map((p: any) => ({
        id: p.id,
        name: p.title,
        price: p.price,
        quantity: 0,
        category: p.category,
        image: p.thumbnail,
    })) as CartItem[];
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increase: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 0) item.quantity -= 1;
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCartFromAPI.pending, state => {
                state.status = "loading";
            })
            .addCase(fetchCartFromAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCartFromAPI.rejected, state => {
                state.status = "failed";
            });
    },
});

export const { increase, decrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
