import { useMutation } from "@tanstack/react-query";
import { signin } from "@/lib/api/auth";
import { SigninData } from "@/types/api.types";
import useAuth from "@/hooks/states/useAuth";

const useSignin = () => {
    const setUserToken = useAuth((state) => state.setUserToken);
    const setUser = useAuth((state) => state.setUser);
    const setCompany = useAuth((state) => state.setCompany);

    return useMutation({
        mutationFn: (data: SigninData) => signin(data),
        onSuccess: (data) => {
            setUserToken(data.token);
            setUser(data.user);
            setCompany(data.company);
        }
    });
};

export default useSignin;
