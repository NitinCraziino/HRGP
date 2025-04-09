import { POST } from "@/lib/api";
import { MessageResponse } from "@/types/api";
import { GetRoutes } from "@/types/api/GetRoutes";
import { PostRoutes } from "@/types/api/PostRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddNewCardPayload = {
    paymentMethodId: string;
    isPrimary: boolean;
};

const useAddNewCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AddNewCardPayload) => {
            const response = await POST<MessageResponse>({
                route: PostRoutes.AddNewCard,
                body: data,
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GetRoutes.GetPaymentMethods] });
        }
    });
};

export default useAddNewCard;
