import { CreateSubscriptionProps } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

const useCreateSubscription = () => {
    return useMutation({
        mutationFn: async (data: CreateSubscriptionProps) => {
            const response = await POST({
                route: PostRoutes.CreateSubscription,
                body: data,
            });
            return response;
        }
    });
};

export default useCreateSubscription;