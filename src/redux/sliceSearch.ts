import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type { Product } from '@/types';

/**
 * Slice untuk fitur pencarian produk global
 * Dipakai di semua navbar dan halaman katalog
 */

interface SearchState {
    query: string;
    filteredProducts: Product[];
}

const initialState: SearchState = {
    query: '',
    filteredProducts: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // ubah query pencarian
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },

        // filter produk berdasarkan title
        filterProducts(state, action: PayloadAction<Product[]>) {
            const query = state.query.trim().toLowerCase();
            if (!query) {
                state.filteredProducts = action.payload;
            } else {
                state.filteredProducts = action.payload.filter((product) =>
                    product.title.toLowerCase().includes(query)
                );
            }
        },
    },
});

export const { setQuery, filterProducts } = searchSlice.actions;

// selector untuk ambil data dari store
export const selectQuery = (state: RootState) => state.search.query;
export const selectFilteredProducts = (state: RootState) => state.search.filteredProducts;

export default searchSlice.reducer;
