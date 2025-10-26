import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeSchema, StoreFormValues } from "@/lib/validations/open_store_validations";

// Hook custom untuk form OpenStore
export const useOpenStore = () => {
    const form = useForm<StoreFormValues>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storeName: "",
            storeDomain: "",
            city: "",
            postalCode: "",
            address: "",
        },
        mode: "onBlur",           // validasi saat blur
        reValidateMode: "onChange", // validasi ulang saat input diubah
    });

    return form;
};
