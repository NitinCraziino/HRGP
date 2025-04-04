import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

interface ForgotPasswordData {
    email: string;
}


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