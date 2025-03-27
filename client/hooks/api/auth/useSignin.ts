import { useMutation } from "@tanstack/react-query";
import { signin } from "@/lib/api/auth";
import { SigninData } from "@/types/api.types";

const useSignin = () => {
    return useMutation({
        mutationFn: (data: SigninData) => signin(data),
        onSuccess: (data) => {
            localStorage.setItem("userToken", data.token);
        }
    });
};

export default useSignin;
