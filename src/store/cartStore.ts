import { create } from "zustand";
import { Product } from "../types";

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((p) => p.id !== productId),
        })),
    clearCart: () => set({ cart: [] }),
    totalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price, 0),
}));

export default useCartStore;
