import useAuth from "./states/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { StatusCode } from "@/types/api";

const useHandleApiError = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleApiError = (error: any) => {
    if (error.statusCode === StatusCode.TOKEN_EXPIRED) {
      logout();
      toast.error("Token expired, please login again", {
        action: {
          label: "Login",
          onClick: () => router.push("/signin"),
        },
        duration: 5000,
      });
    }
  };
  return { handleApiError };
};

export default useHandleApiError;
