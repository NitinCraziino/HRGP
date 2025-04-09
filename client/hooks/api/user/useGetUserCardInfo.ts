import { useQuery } from "@tanstack/react-query";
import { GetRoutes } from "@/types/api/GetRoutes";
import { GET } from "@/lib/api";

interface GetUserCardInfoResponse {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhone: string;
}

const useGetUserCardInfo = () => {
    return useQuery({
        queryKey: [GetRoutes.GetUserCardInfo],
        queryFn: async () => {
            const response = await GET<GetUserCardInfoResponse>({ route: GetRoutes.GetUserCardInfo });
            return response;
        },
    });
};

export default useGetUserCardInfo;