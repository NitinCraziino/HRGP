import { Button, ButtonProps, } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonWithLoadingProps extends ButtonProps {
    isLoading: boolean;
    loaderClassName?: string;
}

const ButtonWithLoading = ({ children, isLoading = false, loaderClassName, ...props }: ButtonWithLoadingProps) => {
    return (
        <Button {...props}>
            {isLoading ?
                <Loader2
                    className={cn("w-6 h-6 animate-spin", loaderClassName)}
                    aria-hidden="true"
                    aria-label="Loading"
                />
                : children
            }
        </Button>
    );
};

export default ButtonWithLoading;   