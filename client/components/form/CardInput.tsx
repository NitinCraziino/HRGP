"use client";

import { useId } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { CreditCardIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CardInput = ({ label, placeholder = "Card number" }: { label?: string; placeholder?: string; }) => {
    const id = useId();
    const { getCardNumberProps } = usePaymentInputs();

    return (
        <div className="*:not-first:mt-2">
            {label && <Label htmlFor={`number-${id}`}>{label}</Label>}
            <div className="relative">
                <Input
                    {...getCardNumberProps()}
                    id={`number-${id}`}
                    className="peer ps-9 [direction:inherit]"
                    placeholder={placeholder}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <CreditCardIcon size={16} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default CardInput;
