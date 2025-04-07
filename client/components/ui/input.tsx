'use client';

import { cn } from "@/lib/utils";
import { useId } from "react";
import { Label } from "./label";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


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

type InputWithErrorProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const InputWithError = ({ label, error, className, placeholder, type, name, defaultValue, ...props }: InputWithErrorProps) => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        className={cn("py-6 px-4 w-full", className)}
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

const DatePicker = ({ label, className, showIcon = true, placeholder, ...props }: React.ComponentProps<"input"> & { label?: string; showIcon?: boolean; placeholder?: string; }) => {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>();
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    setDate(newDate);
    if (props.onChange) {
      props.onChange({ target: { value: newDate ? format(newDate, "dd-MM-yyyy") : "" } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <div className="*:not-first:mt-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={cn(
                "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                !date && "text-muted-foreground",
                className
              )}
            >
              <span
                className={cn("truncate", !date && "text-muted-foreground")}
              >
                {date ? format(date, "dd-MM-yyyy") : placeholder}
              </span>
              {showIcon && <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="flex flex-col gap-2">
              <Input
                type="date"
                value={date ? format(date, "yyyy-MM-dd") : ""}
                onChange={handleDateChange}
                className="w-full [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

    </div>
  );
};


export { Input, InputWithError, DatePicker };
