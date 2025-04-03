import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";

const LoadingOverlay = ({ className }: { className?: string; }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                className
            )}
            aria-disabled={true}
            aria-hidden={true}
            aria-busy={true}
            aria-live="polite"
            aria-label="Loading..."
        >
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
    );
};

export default memo(LoadingOverlay);
