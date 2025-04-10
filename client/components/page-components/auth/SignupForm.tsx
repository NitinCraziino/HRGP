"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithError from "@/components/inputs/InputWithError";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signupSchema, SignupSchemaType } from "@/lib/schema";
import { PhoneInputComponent } from "@/components/inputs/PhoneInput";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import useSignup from "@/hooks/api/auth/useSignup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddressInputs from "./AddressInputs";
import SelectWithSearch from "@/components/inputs/SelectWithSearch";

const companyTypes = [
    { value: "Cooperative", },
    { value: "Corporation" },
    { value: "Educational Institution" },
    { value: "Government Agency" },
    { value: "Individual" },
    { value: "Limited Liability Company" },
    { value: "Non-Government Organization" },
    { value: "Non-Profit Organization" },
    { value: "Partnership" },
    { value: "Sole Proprietorship" }
];

// Sample industries
const industries = [
    { value: "Accounting" },
    { value: "Airlines And Aviation" },
    { value: "Alternative Dispute Resolution" },
    { value: "Alternative Medicine" },
    { value: "Animation" },
    { value: "Apparel And Fashion" },
    { value: "Architecture And Planning" },
    { value: "Arts And Crafts" },
    { value: "Automotive" }
];

const companies = [
    { value: "Company 1" },
    { value: "Company 2" },
    { value: "Company 3" },
    { value: "Company 4" },
    { value: "Company 5" }
];

const positions = [
    { value: "Position 1" },
    { value: "Position 2" },
    { value: "Position 3" },
    { value: "Position 4" },
    { value: "Position 5" }
];

const SignupForm = () => {
    const [phone, setPhone] = useState("+1234567890");
    const [phoneError, setPhoneError] = useState("");
    const [terms, setTerms] = useState(true);
    const [termsError, setTermsError] = useState("");
    const [tabs, setTabs] = useState(1);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        trigger,
        setError,
        control,
        watch
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "asd",
            lastName: "asd",
            email: "asd@asd.com",
            password: "asdasasdas",
            confirmPassword: "asdasasdas",
            companyName: "asd",
            companyType: "asd",
            industry: "asd",
            positionTitle: "asd",
        }
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

    const handleClickNext = useCallback(() => {
        trigger(["firstName", "lastName", "email", "password", "confirmPassword"]);
        if (!validatePhoneAndTerms()) {
            return;
        }
        setTabs(2);
    }, [validatePhoneAndTerms, trigger]);

    const { mutate: signup, isPending } = useSignup();

    const onSubmit = useCallback((data: SignupSchemaType) => {
        try {
            signup({
                firstName: data.firstName,
                lastName: data.lastName,
                primaryEmail: data.email,
                primaryPhone: phone,
                password: data.password,
                companyName: data.companyName,
                companyType: data.companyType,
                industryId: data.industry,
                positionTitle: data.positionTitle,
                postalCode: data.postalCode,
                country: data.country,
                state: data.state,
                city: data.city,
                address: data.address
            }, {
                onError: (error: any) => {
                    toast.error(error.response?.data?.message || "Something went wrong");
                },
                onSuccess: (data) => {
                    toast.success("Signup successful");
                    router.push("/payment");
                }
            });
        } catch (error) {
            console.error('error', phone);
        }
    }, [signup, phone]);

    const handleBack = useCallback(() => {
        setTabs(1);
    }, []);

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

                {tabs === 1 && (
                    <div className="pb-14 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.firstName?.message}
                                type="text"
                                placeholder="First Name"
                                variant="md"
                                {...register("firstName")}
                            />
                            <InputWithError
                                error={errors.lastName?.message}
                                type="text"
                                placeholder="Last Name"
                                variant="md"
                                {...register("lastName")}
                            />
                        </div>

                        <InputWithError
                            error={errors.email?.message}
                            type="email"
                            placeholder="Email"
                            variant="md"
                            {...register("email")}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.password?.message}
                                type="password"
                                placeholder="Password"
                                variant="md"
                                {...register("password")}
                            />
                            <InputWithError
                                error={errors.confirmPassword?.message}
                                type="password"
                                placeholder="Confirm Password"
                                variant="md"
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
                            type="button"
                            className="py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right"
                            onClick={handleClickNext}
                        >
                            Next
                        </Button>
                    </div>
                )}
                {tabs === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div className="w-full">
                                <SelectWithSearch
                                    options={companies}
                                    value={watch("companyName")}
                                    label="Company Name"
                                    placeholder="Select Company"
                                    onChange={(value) => setValue("companyName", value)}
                                    size="md"
                                    isCreatable
                                    onCreateOption={(value) => {
                                        setValue("companyName", value);
                                        companies.push({ value });
                                    }}
                                    error={errors.companyName?.message}

                                />
                            </div>
                            <div className="w-full">
                                <SelectWithSearch
                                    value={watch("positionTitle")}
                                    label="Position Title"
                                    options={positions}
                                    placeholder="Select Position"
                                    size="md"
                                    onChange={(value) => setValue("positionTitle", value)}
                                    isCreatable
                                    onCreateOption={(value) => {
                                        setValue("positionTitle", value);
                                        positions.push({ value });
                                    }}
                                    emptyIndicator="No position found"
                                    error={errors.positionTitle?.message}
                                />
                                {errors.positionTitle?.message && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{errors.positionTitle?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="w-full">
                                <SelectWithSearch
                                    label="Industry"
                                    options={industries}
                                    placeholder="Select Industry"
                                    value={watch("industry")}
                                    onChange={(value) => setValue("industry", value)}
                                    isCreatable
                                    onCreateOption={(value) => {
                                        setValue("industry", value);
                                        industries.push({ value });
                                    }}
                                    error={errors.industry?.message}
                                    size="md"
                                />
                            </div>
                            <div className="w-full">
                                <SelectWithSearch
                                    label="Company Type"
                                    options={companyTypes}
                                    placeholder="Select Company Type"
                                    value={watch("companyType")}
                                    onChange={(value) => setValue("companyType", value)}
                                    isCreatable
                                    onCreateOption={(value) => {
                                        setValue("companyType", value);
                                        companyTypes.push({ value });
                                    }}
                                    error={errors.companyType?.message}
                                    size="md"
                                />
                            </div>
                            <AddressInputs
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                control={control}
                                variant="sm"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                className="py-2 px-8 rounded bg-gray-400 hover:bg-gray-500 text-sm float-right"
                                onClick={handleBack}
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"
                                className={cn("py-2 px-8 rounded bg-green-700 hover:bg-green-500 text-sm float-right", isPending && "opacity-50 cursor-not-allowed")}
                                disabled={isPending || isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </form>

            <div className={`${cn("text-start  text-sm", tabs === 1 ? "mt-16" : "mt-7")}`}>
                Already have an account?{" "}
                <Link href="/signin" className="text-[#5d45f8] hover:text-[#4a35d9] transition-colors">
                    Click here to login
                </Link>
            </div>
        </div>
    );
};

export default SignupForm;
