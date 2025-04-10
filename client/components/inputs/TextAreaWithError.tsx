import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextareaWithErrorProps = React.ComponentProps<"textarea"> & {
    label?: string;
    error?: string;
    defaultValue?: string;
    labelClassName?: string;
    errorClassName?: string;
};

const TextareaWithError = ({ label, error, className, placeholder, defaultValue, labelClassName, errorClassName, ...props }: TextareaWithErrorProps) => {
    const id = useId();
    return (
        <div className="*:not-first:mt-2">
            {label && <Label className={labelClassName} htmlFor={id}>{label}</Label>}
            <Textarea
                id={id}
                className={cn("py-6 px-4 w-full", className)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                aria-invalid={error ? true : false}
                {...props}
            />
            {error && (
                <p
                    className={cn("peer-aria-invalid:text-destructive mt-2 text-xs", errorClassName)}
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextareaWithError;