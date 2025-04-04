import { ResendVerificationCodeData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

const useResendVerificationCode = () => {
    return useMutation({
        mutationFn: async (data: ResendVerificationCodeData) => {
            const response = await POST({
                route: PostRoutes.ResendVerificationCode,
                body: data,
            });
            return response;
        }
    });
};

export default useResendVerificationCode;