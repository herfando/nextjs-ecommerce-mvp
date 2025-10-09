"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BuyerProvider } from "../context/buyer_context";

const queryClient = new QueryClient();

export default function BuyerAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BuyerProvider>{children}</BuyerProvider>
    </QueryClientProvider>
  );
}
