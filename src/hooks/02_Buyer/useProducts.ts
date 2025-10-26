import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/services/product_service";

export function useProducts() {
    return useQuery({
        queryKey: ["buyer-products"],
        queryFn: productService.getAll,
    });
}
