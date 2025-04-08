import { cn } from "@/lib/utils";
import PrivatePageHeader, { PrivatePageHeaderProps } from "../layout/PrivatePageHeader";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface PrivateContainerProps extends PrivatePageHeaderProps {
    children: React.ReactNode;
    className?: string;
}

const PrivateContainer = ({ children, className, ...props }: PrivateContainerProps) => {
    return (
        <main>
            <PrivatePageHeader {...props} />
            <div className={cn("bg-[#E9E9F3] h-full p-3 py-3", className)}>
                {children}
            </div>
        </main>
    );
};

export default PrivateContainer;