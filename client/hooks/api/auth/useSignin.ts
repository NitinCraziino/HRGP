import { useMutation } from "@tanstack/react-query";
import { SigninData, SigninResponse } from "@/types/api";
import useAuth from "@/hooks/states/useAuth";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

const useSignin = () => {
    const setUserToken = useAuth((state) => state.setUserToken);
    const setUser = useAuth((state) => state.setUser);
    const setCompany = useAuth((state) => state.setCompany);

    return useMutation({
        mutationFn: async (data: SigninData) => {
            const response = await POST<SigninResponse>({
                route: PostRoutes.Signin,
                body: data,
            });
            return response;
        },
        onSuccess: (data) => {
            setUserToken(data.token);
            setUser(data.user);
            setCompany(data.company);
        }
    });
};

export default useSignin;
