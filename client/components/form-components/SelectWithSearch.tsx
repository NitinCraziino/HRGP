"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SizeVariant } from "@/types";

interface Option {
    value: string;
    label?: string;
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
    emptyIndicator?: string;
    value?: string;
    // New props
    isCreatable?: boolean;
    onCreateOption?: (inputValue: string) => void;
    onSearch?: (query: string) => void;
    loading?: boolean;
    createOptionText?: string;
    size?: SizeVariant;
}

const SelectWithSearch = ({
    options,
    label,
    onChange,
    labelClassName,
    className,
    placeholder,
    disabled,
    error,
    emptyIndicator = "No items found",
    value,
    isCreatable = false,
    onCreateOption,
    onSearch,
    loading = false,
    createOptionText = "Create",
    size = "md",
}: SelectWithSearchProps) => {
    const id = useId();
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleCreateOption = () => {
        if (onCreateOption && inputValue) {
            onCreateOption(inputValue);
            setOpen(false);
        }
    };

    return (
        <div className={cn(label ? "*:not-first:mt-2" : "")}>
            {label && (
                <Label htmlFor={id} className={cn("text-sm font-medium", labelClassName)}>
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Button
                            id={id}
                            variant="outline"
                            role="combobox"
                            type="button"
                            aria-expanded={open}
                            className={cn(
                                "bg-background hover:bg-background border-input w-full justify-between font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                                size === "xs" && "py-1 px-2 text-xs h-7",
                                size === "sm" && "py-2 px-3 text-sm h-8",
                                size === "md" && "py-2 px-3 text-base h-10",
                                size === "lg" && "py-3 px-4 text-lg h-12",
                                className,
                            )}
                            disabled={disabled}
                        >
                            <span className={cn("truncate", !value && "text-muted-foreground")}>
                                {value ? options.find((option) => option.value === value)?.label || value : placeholder}
                            </span>
                            <ChevronDownIcon
                                size={size === "xs" ? 14 : size === "sm" ? 16 : size === "lg" ? 20 : 16}
                                className="text-muted-foreground/80 shrink-0"
                                aria-hidden="true"
                            />
                        </Button>
                        {error && (
                            <p
                                className={cn(
                                    "text-destructive mt-2",
                                    size === "xs" && "text-[10px]",
                                    size === "sm" && "text-xs",
                                    size === "md" && "text-sm",
                                    size === "lg" && "text-base",
                                )}
                            >
                                {error}
                            </p>
                        )}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className={cn(
                        "border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0",
                        error && "border-destructive",
                        size === "xs" && "text-xs",
                        size === "sm" && "text-sm",
                        size === "md" && "text-base",
                        size === "lg" && "text-lg",
                    )}
                    align="start"
                >
                    <Command>
                        <CommandInput
                            placeholder={placeholder}
                            value={inputValue}
                            onValueChange={handleInputChange}
                            className={cn(
                                size === "xs" && "h-7 text-xs",
                                size === "sm" && "h-8 text-sm",
                                size === "md" && "h-10 text-base",
                                size === "lg" && "h-12 text-lg",
                            )}
                        />
                        <CommandList>
                            {loading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2Icon
                                        className={cn(
                                            "animate-spin text-muted-foreground",
                                            size === "xs" && "h-4 w-4",
                                            size === "sm" && "h-4 w-4",
                                            size === "md" && "h-5 w-5",
                                            size === "lg" && "h-6 w-6",
                                        )}
                                    />
                                </div>
                            ) : (
                                <>
                                    <CommandEmpty className="py-3 px-2">
                                        {isCreatable && inputValue ? (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size={size === "lg" ? "default" : "sm"}
                                                className="w-full justify-start"
                                                onClick={handleCreateOption}
                                            >
                                                {createOptionText ? `${createOptionText} "${inputValue}"` : `Add "${inputValue}"`}
                                            </Button>
                                        ) : (
                                            <span>{emptyIndicator}</span>
                                        )}
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                className={cn(
                                                    "cursor-pointer",
                                                    size === "xs" && "py-1",
                                                    size === "sm" && "py-1.5",
                                                    size === "md" && "py-2",
                                                    size === "lg" && "py-2.5",
                                                )}
                                                value={option.value}
                                                onSelect={(currentValue) => {
                                                    onChange(currentValue);
                                                    setInputValue("");
                                                    setOpen(false);
                                                }}
                                            >
                                                {option.label || option.value}
                                                {value === option.value && (
                                                    <CheckIcon
                                                        size={size === "xs" ? 14 : size === "sm" ? 16 : size === "lg" ? 20 : 16}
                                                        className="ml-auto"
                                                    />
                                                )}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SelectWithSearch;
