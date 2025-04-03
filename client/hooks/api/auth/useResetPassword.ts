import { resetPassword } from "@/lib/api/auth";
import { ResetPasswordData } from "@/types/api.types";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPasswordData) => resetPassword(data)
    });
};

export default useResetPassword;                