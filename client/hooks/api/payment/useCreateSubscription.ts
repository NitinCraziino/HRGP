import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

interface CreateSubscriptionProps {
    paymentMethodId: string;
    customerId: string;
    companyId: string;
    email: string;
    name: string;
    phone: string;
    userId: string;
}

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