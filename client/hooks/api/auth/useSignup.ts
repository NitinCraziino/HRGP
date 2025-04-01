import { signup } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { SignupData } from "@/types/api.types";
import useAuth from "@/hooks/states/useAuth";

const useSignup = () => {
    const setUser = useAuth((state) => state.setUser);
    return useMutation({
        mutationFn: (data: SignupData) => signup(data),
        onSuccess: (data) => {
            console.log('data', data);
            setUser(data);
        }
    });
};

export default useSignup;
