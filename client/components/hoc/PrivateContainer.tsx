import { cn } from "@/lib/utils";
import { WrapperProps } from "@/types/props";

const PrivateContainer = ({ children, className }: WrapperProps) => {
    return (
        <main className={cn("min-h-screen bg-[#E9E9F3] p-3 py-2", className)}>
            {children}
        </main>
    );
};

export default PrivateContainer;