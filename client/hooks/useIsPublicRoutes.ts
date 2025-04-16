import { usePathname } from "next/navigation";
import useAuth from "./states/useAuth";
import { useEffect, useState } from "react";

const useIsPublicRoutes = () => {
  const { userToken } = useAuth();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return false;

  const isPublicRoute =
    pathname.includes("/signin") ||
    pathname.includes("/signup") ||
    pathname.includes("/forgot-password") ||
    pathname === "/payment";

  // for showing navbar on Private routes when it's not found, or when user try to access a not found route
  if (!userToken && !isPublicRoute) {
    return true;
  }

  return isPublicRoute;
};

export default useIsPublicRoutes;
