import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/states/useAuth";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { AuthStateCompany, AuthStateUser } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SigninData {
    email: string;
    password: string;
};

interface SigninResponse {
    token: string;
    user: AuthStateUser;
    company: AuthStateCompany;
};

const useSignin = () => {
    const setUserToken = useAuth((state) => state.setUserToken);
    const setUser = useAuth((state) => state.setUser);
    const setCompany = useAuth((state) => state.setCompany);
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: SigninData) => {
            const response = await POST<SigninResponse>({
                route: PostRoutes.Signin,
                body: data,
            });
            return response;
        },
        onSuccess: (data) => {
            toast.success("Login successful", {
                icon: "🔑"
            });
            setUserToken(data.token);
            setUser(data.user);
            setCompany(data.company);
            setTimeout(() => {
                router.push("/applications");
            }, 0);
        }
    });
};

export default useSignin;
