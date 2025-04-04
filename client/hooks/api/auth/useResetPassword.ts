import { POST } from "@/lib/api";
import { ResetPasswordData } from "@/types/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data: ResetPasswordData) => {
            const response = await POST({
                route: PostRoutes.ResetPassword,
                body: data,
            });
            return response;
        }
    });
};
export default useResetPassword;                