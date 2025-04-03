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
import { cn } from "@/lib/utils";
import MultipleSelector from "../ui/multiselect";
import useSignup from "@/hooks/api/auth/useSignup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddressInputs from "./AddressInputs";

const companyTypes = [
    { value: "Cooperative", label: "Cooperative" },
    { value: "Corporation", label: "Corporation" },
    { value: "Educational Institution", label: "Educational Institution" },
    { value: "Government Agency", label: "Government Agency" },
    { value: "Individual", label: "Individual" },
    { value: "Limited Liability Company", label: "Limited Liability Company" },
    { value: "Non-Government Organization", label: "Non-Government Organization" },
    { value: "Non-Profit Organization", label: "Non-Profit Organization" },
    { value: "Partnership", label: "Partnership" },
    { value: "Sole Proprietorship", label: "Sole Proprietorship" }
];

// Sample industries
const industries = [
    { value: "1", label: "Accounting" },
    { value: "2", label: "Airlines And Aviation" },
    { value: "3", label: "Alternative Dispute Resolution" },
    { value: "4", label: "Alternative Medicine" },
    { value: "5", label: "Animation" },
    { value: "6", label: "Apparel And Fashion" },
    { value: "7", label: "Architecture And Planning" },
    { value: "8", label: "Arts And Crafts" },
    { value: "9", label: "Automotive" }
];

const companies = [
    { value: "1", label: "Company 1" },
    { value: "2", label: "Company 2" },
    { value: "3", label: "Company 3" },
    { value: "4", label: "Company 4" },
    { value: "5", label: "Company 5" }
];

const positions = [
    { value: "1", label: "Position 1" },
    { value: "2", label: "Position 2" },
    { value: "3", label: "Position 3" },
    { value: "4", label: "Position 4" },
    { value: "5", label: "Position 5" }
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
        formState: { errors, },
        setValue,
        trigger,
        getValues,
        setError,
        control
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

    const onSubmit = useCallback((data: z.infer<typeof signupSchema>) => {
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
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.firstName?.message}
                                type="text"
                                placeholder="First Name"
                                className="py-6 px-4 w-full"
                                {...register("firstName")}
                            />
                            <InputWithError
                                error={errors.lastName?.message}
                                type="text"
                                placeholder="Last Name"
                                className="py-6 px-4 w-full"
                                {...register("lastName")}
                            />
                        </div>

                        <InputWithError
                            error={errors.email?.message}
                            type="email"
                            placeholder="Email"
                            className="py-6 px-4 w-full"
                            {...register("email")}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <InputWithError
                                error={errors.password?.message}
                                type="password"
                                placeholder="Password"
                                className="py-6 px-4 w-full"
                                {...register("password")}
                            />
                            <InputWithError
                                error={errors.confirmPassword?.message}
                                type="password"
                                placeholder="Confirm Password"
                                className="py-6 px-4 w-full"
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
                    </>
                )}
                {tabs === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div className="w-full">
                                <MultipleSelector
                                    options={companies}
                                    placeholder="Select Company"
                                    defaultOptions={companies}
                                    onChange={(values) => setValue("companyName", values[0]?.value)}
                                    creatable
                                    maxSelected={1}
                                    hidePlaceholderWhenSelected
                                    emptyIndicator={<p className="text-gray-500 text-sm">No company found</p>}
                                />
                                {errors.companyName?.message && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{errors.companyName?.message}</p>
                                )}
                            </div>
                            <div className="w-full">
                                <MultipleSelector
                                    options={positions}
                                    placeholder="Select Position"
                                    defaultOptions={positions}
                                    onChange={(values) => setValue("positionTitle", values[0]?.value)}
                                    creatable
                                    hidePlaceholderWhenSelected
                                    maxSelected={1}
                                    emptyIndicator={<p className="text-gray-500 text-sm">No position found</p>}
                                />
                                {errors.positionTitle?.message && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{errors.positionTitle?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="w-full">
                                <MultipleSelector
                                    options={industries}
                                    placeholder="Select Industry"
                                    defaultOptions={industries}
                                    hidePlaceholderWhenSelected
                                    onChange={(values) => setValue("industry", values[0]?.value)}
                                    creatable
                                    maxSelected={1}
                                    emptyIndicator={<p className="text-gray-500 text-sm">No industry found</p>}
                                />
                                {errors.industry?.message && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{errors.industry?.message}</p>
                                )}
                            </div>
                            <div className="w-full">
                                <MultipleSelector
                                    options={companyTypes}
                                    placeholder="Select Company Type"
                                    defaultOptions={companyTypes}
                                    onChange={(values) => setValue("companyType", values[0]?.value)}
                                    creatable
                                    hidePlaceholderWhenSelected
                                    maxSelected={4}
                                    emptyIndicator={<p className="text-gray-500 text-sm">No company type found</p>}
                                />
                                {errors.companyType?.message && (
                                    <p className="text-red-500 text-xs mt-2 font-medium">{errors.companyType?.message}</p>
                                )}
                            </div>
                            <AddressInputs
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                control={control}
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
                                disabled={isPending}
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
