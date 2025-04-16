import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/states/useAuth";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";

interface SignupData {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhone: string;
  password: string;
  companyName: string;
  companyType: string;
  industryId: string;
  positionTitle: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

interface SignupResponse {
  userId: string;
  primaryEmail: string;
  primaryPhone: string;
  firstName: string;
  lastName: string;
  companyId: string;
  stripeCustomerId: string;
}

const useSignup = () => {
  const setUser = useAuth((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await POST<SignupResponse>({
        route: PostRoutes.Signup,
        body: data,
      });
      return response;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
};

export default useSignup;
