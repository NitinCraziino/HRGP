import { type ComponentProps, useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SizeVariant } from "@/types";

type InputWithErrorProps = ComponentProps<"input"> & {
    label?: string;
    error?: string;
    variant?: SizeVariant;
    errorClassName?: string;
    labelClassName?: string;
};

const InputWithError = ({
    label,
    error,
    className,
    placeholder,
    type,
    name,
    defaultValue,
    variant = "sm",
    labelClassName,
    errorClassName,
    ...props
}: InputWithErrorProps) => {
    const id = useId();
    return (
        <div className="*:not-first:mt-2">
            {label && <Label className={labelClassName} htmlFor={id}>{label}</Label>}
            <Input
                id={id}
                className={cn(
                    "w-full",
                    variant === "xs" && "py-1 px-2 text-xs",
                    variant === "sm" && "py-2 px-3 text-sm",
                    variant === "md" && "py-6 px-4 text-base",
                    variant === "lg" && "py-7 px-5 text-lg",
                    className,
                )}
                placeholder={placeholder}
                type={type}
                name={name}
                defaultValue={defaultValue}
                aria-invalid={error ? true : false}
                {...props}
            />
            {error && (
                <p
                    className={cn(
                        "peer-aria-invalid:text-destructive mt-2",
                        variant === "xs" && "text-[10px]",
                        variant === "sm" && "text-xs",
                        variant === "md" && "text-xs",
                        variant === "lg" && "text-sm",
                        errorClassName
                    )}
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputWithError;