import { cn } from "@/lib/utils";
import { memo } from "react";
import { ContainerProps } from "@/types/props";

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn(`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 `, className)} >
            {children}
        </div>
    );
};

export default memo(Container);   