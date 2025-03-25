
import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "./label";
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

const InputWithError = ({ label, error, className, placeholder, type, name, defaultValue, ...props }: { label?: string, error: string, className: string, placeholder: string, type: string, name: string, defaultValue?: string; } & React.ComponentProps<"input">) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        className={cn(className, "py-6")}
        placeholder={placeholder}
        type={type}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : false}
        {...props}
      />
      {error && (
        <p
          className="peer-aria-invalid:text-destructive mt-2 text-xs"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export { Input, InputWithError };
