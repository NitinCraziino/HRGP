import { createSubscription } from "@/lib/api/payment";
import { CreateSubscriptionProps } from "@/types/api.types";
import { useMutation } from "@tanstack/react-query";

export const useCreateSubscription = () => {
    return useMutation({
        mutationFn: (data: CreateSubscriptionProps) => createSubscription(data)
    });
};