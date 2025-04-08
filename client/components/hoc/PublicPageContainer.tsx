import { cn } from "@/lib/utils";
import { memo } from "react";
import { PublicPageContainerContainerProps } from "@/types/props";

const PublicPageContainer = ({ children, className }: PublicPageContainerContainerProps) => {
    return (
        <div className={cn(`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 `, className)} >
            {children}
        </div>
    );
};

export default memo(PublicPageContainer);   