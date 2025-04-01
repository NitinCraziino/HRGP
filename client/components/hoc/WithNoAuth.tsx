'use client';

import useAuth from "@/hooks/states/useAuth";
import { useRouter } from "next/navigation";
import { memo } from "react";

const WithNoAuth = ({ children }: { children: React.ReactNode; }) => {
    const { user, userToken } = useAuth();
    const router = useRouter();

    if (user || userToken) {
        router.push("/payment");
    }

    return <>{children}</>;
};

export default memo(WithNoAuth);