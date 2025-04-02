'use client';

import useAuth from "@/hooks/states/useAuth";
import { notFound } from "next/navigation";
import { useEffect, memo, useState } from "react";
import PageSkeleton from "../PageSkeleton";

const WithUser = ({ children }: { children: React.ReactNode; }) => {
    const { user, userToken } = useAuth();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <PageSkeleton />;

    if (user && !userToken) {
        return <>{children}</>;
    }

    notFound();
};

export default memo(WithUser);
