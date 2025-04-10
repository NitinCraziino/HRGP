import { GetRoutes } from "@/types/api/GetRoutes";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/lib/api";
import { Card } from "@/types";
import useHandleApiError from "@/hooks/useHandleApiError";

const useGetPaymentMethods = () => {
    const { handleApiError } = useHandleApiError();

    return useQuery({
        queryKey: [GetRoutes.GetPaymentMethods],
        queryFn: async () => {
            try {
                const response = await GET<Card[]>({
                    route: GetRoutes.GetPaymentMethods,
                });
                return response;
            } catch (error) {
                handleApiError(error);
                throw error;
            }
        },
    });
};

export default useGetPaymentMethods;