"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import React, { useId } from "react";
import * as RPNInput from "react-phone-number-input";

export const PhoneInputComponent = ({
  label,
  placeholder,
  error,
  phone,
  setPhone,
}: {
  label?: string;
  placeholder?: string;
  error?: string;
  phone?: string;
  setPhone?: (phone: string) => void;
}) => {
  const id = useId();

  return (
    <div className="*:not-first:mt-2" dir="ltr">
      {label && <Label htmlFor={id}>{label}</Label>}
      <RPNInput.default
        className="flex min-h-[50px]"
        international
        countrySelectComponent={CountrySelect}
        placeholder={placeholder}
        inputComponent={PhoneInput}
        id={id}
        value={phone}
        onChange={(newValue) => setPhone?.(newValue ?? "")}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn("-ms-px rounded-s-none shadow-none min-h-[50px] focus-visible:z-10", className)}
      {...props}
    />
  );
};

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center" aria-hidden="true">
        <span className="font-medium text-black text-sm">{value ? `${value}` : "Select"}</span>
        <ChevronDownIcon size={16} aria-hidden="true" />
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label} +{RPNInput.getCountryCallingCode(option.value as RPNInput.Country)}
            </option>
          ))}
      </select>
    </div>
  );
};
