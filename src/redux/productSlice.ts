import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    img: string;
    title: string;
    price: string;
    rating: string;
    sold: string;
    store: string;
    category?: string;
    description?: string;
}

interface ApiProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    description: string;
    rating: number;
    stock: number;
}

// --- Async Thunk: Fetch produk dari API ---
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();

    return data.products.map((p: ApiProduct) => ({
        id: p.id,
        img: p.thumbnail,
        title: p.title,
        price: `$${p.price.toFixed(2)}`,
        rating: p.rating.toFixed(1),
        sold: `${p.stock} sold`,
        store: 'Global Market',
        category: p.category,
        description: p.description,
    }));
});

interface ProductsState {
    items: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
};

// --- Slice Produk ---
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productsSlice.reducer;
