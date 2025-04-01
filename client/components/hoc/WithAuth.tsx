'use client';
import useAuth from "@/hooks/states/useAuth";
import { useRouter } from "next/navigation";
import { memo } from "react";

const WithAuth = ({ children }: { children: React.ReactNode; }) => {
    const { user, userToken } = useAuth();
    const router = useRouter();

    if (!user) {
        router.push("/signin");
    }

    if (!userToken) {
        router.push("/signin");
    }

    return <>{children}</>;
};

export default memo(WithAuth);