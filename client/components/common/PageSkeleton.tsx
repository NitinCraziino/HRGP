import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const PageSkeleton = () => {
    return (
        <div className="flex justify-center min-h-screen items-center px-8 lg:px-32 py-20 md:py-40 ">
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full ">
                <Skeleton className="w-full h-full" />
            </div>
        </div>
    );
};

export default memo(PageSkeleton);
