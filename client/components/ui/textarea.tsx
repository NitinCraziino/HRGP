import * as React from "react";

import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "@radix-ui/react-label";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

const TextareaWithError = ({ label, error, className, placeholder, defaultValue, ...props }: React.ComponentProps<"textarea"> & { label?: string; error?: string; defaultValue?: string; }) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
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

export { Textarea, TextareaWithError };
