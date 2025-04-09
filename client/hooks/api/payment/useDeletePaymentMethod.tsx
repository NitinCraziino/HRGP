import { DELETE } from "@/lib/api";
import { MessageResponse } from "@/types/api";
import { DeleteRoutesWithParams } from "@/types/api/DeleteRoutes";
import { GetRoutes } from "@/types/api/GetRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePaymentMethod = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (methodId: string) => {
            const response = await DELETE<MessageResponse>({ route: DeleteRoutesWithParams.DeletePaymentMethod, params: { id: methodId } });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GetRoutes.GetPaymentMethods] });
        }
    });
};

export default useDeletePaymentMethod;