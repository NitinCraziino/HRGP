import { POST } from "@/lib/api";
import { VerifyVerificationCodeData } from "@/types/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { useMutation } from "@tanstack/react-query";

const useVerifyVerificationCode = () => {
    return useMutation({
        mutationFn: async ({ email, verificationCode }: VerifyVerificationCodeData) => {
            const response = await POST({
                route: PostRoutes.VerifyVerificationCode,
                body: {
                    email,
                    verificationCode,
                },
            });
            return response;
        }
    });
};

export default useVerifyVerificationCode;
