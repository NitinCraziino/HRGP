import { cn } from "@/lib/utils";
import { useId } from "react";
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
import { Label } from "@/components/ui/label";
import InputWithError from "./InputWithError";
import { SizeVariant } from "@/types";


type DatePickerProps = React.ComponentProps<"input"> & {
    label?: string;
    showIcon?: boolean;
    placeholder?: string;
    variant?: SizeVariant;
    error?: string;
};


const DatePicker = ({ label, className, showIcon = true, placeholder, variant = "md", error, ...props }: DatePickerProps) => {
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
                            <InputWithError
                                type="date"
                                value={date ? format(date, "yyyy-MM-dd") : ""}
                                onChange={handleDateChange}
                                variant={variant}
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


export default DatePicker;