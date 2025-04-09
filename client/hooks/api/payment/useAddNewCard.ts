import { POST } from "@/lib/api";
import { MessageResponse } from "@/types/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { useMutation } from "@tanstack/react-query";

type AddNewCardPayload = {
    paymentMethodId: string;
    isPrimary: boolean;
};

const useAddNewCard = () => {
    return useMutation({
        mutationFn: async (data: AddNewCardPayload) => {
            const response = await POST<MessageResponse>({
                route: PostRoutes.AddNewCard,
                body: data,
            });
            return response;
        }
    });
};

export default useAddNewCard;
