import { usePathname } from "next/navigation";

const useIsPublicRoutes = () => {
    const pathname = usePathname();
    const isPublicRoute = pathname.includes('/signin') || pathname.includes('/signup') || pathname.includes('/forgot-password') || pathname === '/payment';
    return isPublicRoute;
};

export default useIsPublicRoutes;   