"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputWithError } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { signupSchema } from "@/lib/schema";
import { PhoneInputComponent } from "../ui/phoneinput";
import { useState, useCallback } from "react";

const SignupForm = () => {
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [terms, setTerms] = useState(false);
    const [termsError, setTermsError] = useState("");
    const [tabs, setTabs] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors, },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const validatePhoneAndTerms = useCallback(() => {
        let hasError = false;
        if (!terms) {
            setTermsError("You must accept the terms and conditions");
            hasError = true;
        } else {
            setTermsError("");
        }

        if (!phone) {
            setPhoneError("Phone number is required");
            hasError = true;
        } else if (!/^\+?\d+$/.test(phone)) {
            setPhoneError("Invalid phone number");
            hasError = true;
        } else {
            setPhoneError("");
        }

        return !hasError;
    }, [terms, phone]);

    const onSubmit = (data: z.infer<typeof signupSchema>) => {
        if (!validatePhoneAndTerms()) {
            return;
        }

        data = { ...data, phone };
        try {
            console.log(data, phone);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md">
            {tabs === 1 && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.firstName?.message || ""}
                                type="text"
                                placeholder="First Name"
                                className="py-3 px-4 w-full"
                                {...register("firstName")}
                            />
                            <InputWithError
                                error={errors.lastName?.message || ""}
                                type="text"
                                placeholder="Last Name"
                                className="py-3 px-4 w-full"
                                {...register("lastName")}
                            />
                        </div>

                        <InputWithError
                            error={errors.email?.message || ""}
                            type="email"
                            placeholder="Email"
                            className="py-3 px-4 w-full"
                            {...register("email")}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.password?.message || ""}
                                type="password"
                                placeholder="Password"
                                className="py-3 px-4 w-full"
                                {...register("password")}
                            />
                            <InputWithError
                                error={errors.confirmPassword?.message || ""}
                                type="password"
                                placeholder="Confirm Password"
                                className="py-3 px-4 w-full"
                                {...register("confirmPassword")}
                            />
                        </div>

                        <PhoneInputComponent
                            placeholder="Phone Number"
                            error={phoneError}
                            phone={phone}
                            setPhone={setPhone}
                        />

                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="terms"
                                className="mt-1"
                                checked={terms}
                                onCheckedChange={(checked) => setTerms(checked === "indeterminate" ? false : checked)}
                            />
                            <div className="flex-1">
                                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                                    I accept the{" "}
                                    <Link href="/terms" className="font-medium text-[#5d45f8] hover:text-[#4a35d9] transition-colors">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/user-agreement" className="font-medium text-[#5d45f8] hover:text-[#4a35d9] transition-colors">
                                        User Agreement
                                    </Link>
                                </label>
                                {termsError && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{termsError}</p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right"
                            onClick={validatePhoneAndTerms}
                        >
                            Next
                        </Button>
                    </form>

                    <div className="text-start mt-16 text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-[#5d45f8] hover:text-[#4a35d9] transition-colors">
                            Click here to login
                        </Link>
                    </div>
                </>
            )}
            {tabs === 2 && (
                <>
                    <h1>Signup</h1>
                </>
            )}
        </div>
    );
};

export default SignupForm;
