import { resendVerificationCode } from "@/lib/api/auth";
import { ResendVerificationCodeData } from "@/types/api.types";
import { useMutation } from "@tanstack/react-query";

const useResendVerificationCode = () => {
    return useMutation({
        mutationFn: (data: ResendVerificationCodeData) => resendVerificationCode(data)
    });
};

export default useResendVerificationCode;