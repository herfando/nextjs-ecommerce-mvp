import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/redux/productSlice';
import type { RootState } from '@/redux/store';

interface SearchState {
    query: string;
    filtered: Product[];
}

const initialState: SearchState = {
    query: '',
    filtered: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        filterProducts: (state, action: PayloadAction<Product[]>) => {
            if (!state.query.trim()) {
                state.filtered = action.payload;
            } else {
                state.filtered = action.payload.filter((p) =>
                    p.title.toLowerCase().includes(state.query.toLowerCase())
                );
            }
        },
    },
});

export const { setQuery, filterProducts } = searchSlice.actions;

// Selector bantu
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
