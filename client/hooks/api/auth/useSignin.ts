import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/states/useAuth";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

interface SigninData {
    email: string;
    password: string;
};

interface SigninResponse {
    token: string;
    user: {
        userId: string;
        firstName: string;
        lastName: string;
        primaryEmail: string;
        companyId: string;
        primaryPhone: string;
        stripeCustomerId?: string;
    };
    company: {
        companyId: string;
        companyName: string;
        companyType: string;
        companyAbout: string;
    };
};

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
