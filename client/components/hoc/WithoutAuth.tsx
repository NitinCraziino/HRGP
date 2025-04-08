'use client';
import useAuth from "@/hooks/states/useAuth";
import { memo, useEffect, useState } from "react";
import PageSkeleton from "../common/PageSkeleton";
import { notFound } from "next/navigation";
import { WrapperProps } from "@/types/props";

const WithoutAuth = ({ children }: WrapperProps) => {
    const { userToken } = useAuth();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <PageSkeleton />;

    if (!userToken) {
        return <>{children}</>;
    }

    notFound();
};

export default memo(WithoutAuth);