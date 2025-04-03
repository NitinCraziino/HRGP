import { verifyVerificationCode } from "@/lib/api/auth";
import { VerifyVerificationCodeData } from "@/types/api.types";
import { useMutation } from "@tanstack/react-query";

const useVerifyVerificationCode = () => {
    return useMutation({
        mutationFn: (data: VerifyVerificationCodeData) => verifyVerificationCode(data)
    });
};

export default useVerifyVerificationCode;
