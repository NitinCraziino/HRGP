import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api/auth";
import { ForgotPasswordData } from "@/types/api.types";

const useForgotPassword = () => {
    return useMutation({
        mutationFn: (data: ForgotPasswordData) => forgotPassword(data)
    });
};

export default useForgotPassword;