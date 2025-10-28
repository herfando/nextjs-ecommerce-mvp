import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/redux/productSlice';
import searchReducer from '@/redux/searchSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        search: searchReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
