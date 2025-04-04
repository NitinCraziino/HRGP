import { useMutation } from "@tanstack/react-query";
import { SignupData, SignupResponse } from "@/types/api";
import useAuth from "@/hooks/states/useAuth";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

const useSignup = () => {
    const setUser = useAuth((state) => state.setUser);
    return useMutation({
        mutationFn: async (data: SignupData) => {
            const response = await POST<SignupResponse>({
                route: PostRoutes.Signup,
                body: data,
            });
            return response;
        },
        onSuccess: (data) => {
            setUser(data);
        }
    });
};

export default useSignup;
