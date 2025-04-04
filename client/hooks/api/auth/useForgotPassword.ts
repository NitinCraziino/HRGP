import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordData } from "@/types/api";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (data: ForgotPasswordData) => {
            const response = await POST({
                route: PostRoutes.ForgotPassword,
                body: data,
            });
            return response;
        }
    });
};

export default useForgotPassword;