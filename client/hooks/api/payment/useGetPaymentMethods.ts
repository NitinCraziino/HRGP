import { GetRoutes } from "@/types/api/GetRoutes";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/lib/api";
import { Card } from "@/types";

const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: [GetRoutes.GetPaymentMethods],
        queryFn: async () => {
            const response = await GET<Card[]>({
                route: GetRoutes.GetPaymentMethods,
            });
            return response;
        },
    });
};

export default useGetPaymentMethods;