import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { useMutation } from "@tanstack/react-query";

interface VerifyVerificationCodeData {
  email: string;
  verificationCode: string;
}

const useVerifyVerificationCode = () => {
  return useMutation({
    mutationFn: async ({ email, verificationCode }: VerifyVerificationCodeData) => {
      const response = await POST({
        route: PostRoutes.VerifyVerificationCode,
        body: {
          email,
          verificationCode,
        },
      });
      return response;
    },
  });
};

export default useVerifyVerificationCode;
