"use client";

import { cn } from "@/lib/utils";
import PrivatePageHeader, { PrivatePageHeaderProps } from "../layout/PrivatePageHeader";
import PrivateFooter from "../layout/PrivateFooter";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "@/hooks/states/useAuth";
import PageSkeleton from "../common/PageSkeleton";
import { notFound } from "next/navigation";

interface PrivateContainerProps extends PrivatePageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PrivateContainer = ({ children, className, ...props }: PrivateContainerProps) => {
  const { userToken } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageSkeleton />;

  if (userToken) {
    return (
      <main>
        <PrivatePageHeader {...props} />
        <div className={cn("bg-[#E9E9F3] h-full p-3 py-3", className)}>{children}</div>
        <PrivateFooter />
      </main>
    );
  }

  notFound();
};

export default PrivateContainer;
