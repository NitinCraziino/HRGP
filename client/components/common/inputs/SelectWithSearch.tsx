"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
    value: string;
    label: string;
}

interface SelectWithSearchProps {
    options: Option[];
    label?: string;
    onChange: (value: string) => void;
    labelClassName?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    noItemsText?: string;
    value?: string;

}

const SelectWithSearch = ({ options, label, onChange, labelClassName, className, placeholder, disabled, error, noItemsText, value }: SelectWithSearchProps) => {
    const id = useId();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id} className={cn("text-sm font-medium", labelClassName)}>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Button
                            id={id}
                            variant="outline"
                            role="combobox"
                            type="button"
                            aria-expanded={open}
                            className={cn("bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]", className)}
                            disabled={disabled}
                        >
                            <span className={cn("truncate", !value && "text-muted-foreground")}>
                                {value
                                    ? options.find((option) => option.value === value)
                                        ?.label
                                    : placeholder}
                            </span>
                            <ChevronDownIcon
                                size={16}
                                className="text-muted-foreground/80 shrink-0"
                                aria-hidden="true"
                            />
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className={cn("border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0", error && "border-red-500")}
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty className="max-h-[200px] overflow-y-auto">{noItemsText}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        className="cursor-pointer"
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {option.label}
                                        {value === option.value && (
                                            <CheckIcon size={16} className="ml-auto" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SelectWithSearch;