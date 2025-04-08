"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { InputWithError } from "../ui/input";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import useResendVerificationCode from "@/hooks/api/auth/useResendVerificationCode";
import useVerifyVerificationCode from "@/hooks/api/auth/useVerifyVerificationCode";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Schema for password reset form with validation rules
const forgotPasswordFormSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const ForgetPasswordForm = () => {
    const [otpExpiryTime, setOtpExpiryTime] = useState(60);
    const [stage, setStage] = useState<"email" | "otp" | "password">("email");
    const router = useRouter();

    const {
        register,
        formState: { errors },
        trigger,
        getValues,
        setError
    } = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange"
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setOtpExpiryTime(prev => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const { mutate: forgotPassword, isPending: isForgotPasswordLoading } = useForgotPassword();
    const { mutate: resendVerificationCode, isPending: isResendVerificationCodeLoading } = useResendVerificationCode();
    const { mutate: verifyVerificationCode, isPending: isVerifyVerificationCodeLoading } = useVerifyVerificationCode();
    const { mutate: resetPassword, isPending: isResetPasswordLoading } = useResetPassword();


    const handleResendCode = useCallback(() => {
        resendVerificationCode({ email: getValues("email") }, {
            onSuccess: () => {
                setOtpExpiryTime(60);
                toast.success("Verification code sent to your email");
            },
            onError: (error: any) => {
                toast.error(error.response.data.message || "Something went wrong");
            }
        });
    }, [resendVerificationCode, getValues]);

    /**
     * Handles form submission for all stages
     * Validates inputs and triggers appropriate API calls based on current stage
     */
    const handleSubmitClick = useCallback(async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Email stage: Validate email and request OTP and send the code to the email
        if (stage === "email") {
            const isEmailValid = await trigger("email");
            if (isEmailValid) {
                forgotPassword({ email: getValues("email") }, {
                    onSuccess: () => {
                        setStage("otp");
                        toast.success("Verification code sent to your email");
                        setOtpExpiryTime(60);
                    },
                    onError: (error: any) => {
                        const errorMessage = error.response.data.message || "Something went wrong";
                        setError("email", { message: errorMessage });
                        toast.error(errorMessage);
                    }
                });
            }
        }
        // OTP stage: Validate OTP code and verify the code and then move to the password stage
        else if (stage === "otp") {
            const isOtpValid = await trigger("otp");
            if (isOtpValid) {
                verifyVerificationCode({
                    email: getValues("email"),
                    verificationCode: getValues("otp")
                }, {
                    onSuccess: () => {
                        setStage("password");
                        toast.success("Verification code verified");
                    },
                    onError: (error: any) => {
                        const errorMessage = error.response.data.message || "Something went wrong";
                        setError("otp", { message: errorMessage });
                        toast.error(errorMessage);
                    }
                });
            }
        }
        // Password stage: Validate and reset password and update the password and then redirect to the signin page
        else if (stage === "password") {
            const isPasswordValid = await trigger(["password", "confirmPassword"]);
            if (isPasswordValid) {
                resetPassword({
                    email: getValues("email"),
                    verificationCode: getValues("otp"),
                    newPassword: getValues("password")
                }, {
                    onSuccess: () => {
                        toast.success("Password reset successfully");
                        router.push("/signin");
                    },
                    onError: (error: any) => {
                        const errorMessage = error.response.data.message || "Something went wrong";
                        setError("password", { message: errorMessage });
                        toast.error(errorMessage);
                    }
                });
            }
        }
    }, [forgotPassword, verifyVerificationCode, resetPassword, getValues, stage, router, trigger, setError]);

    const getButtonText = useCallback(() => {
        if (stage === "email") return "Send Code";
        if (stage === "otp") return "Verify Code";
        return "Reset Password";
    }, [stage]);

    const isButtonLoading = useCallback(() => {
        if (stage === "email") return isForgotPasswordLoading;
        if (stage === "otp") return isVerifyVerificationCodeLoading;
        return isResetPasswordLoading;
    }, [stage, isForgotPasswordLoading, isVerifyVerificationCodeLoading, isResetPasswordLoading]);

    return (
        <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
            <InputWithError
                type="email"
                placeholder="Enter your email"
                className="py-6 px-4 w-full"
                {...register("email")}
                error={errors.email?.message}
                disabled={stage !== "email"}
            />

            {(stage === "otp") && (
                <div>
                    <InputWithError
                        type="text"
                        placeholder="Enter the verification code"
                        className="py-6 px-4 w-full"
                        {...register("otp")}
                        error={errors.otp?.message}
                    />
                    {stage === "otp" && (
                        <p className="text-sm text-gray-500">
                            Verification code will expire in {otpExpiryTime} seconds
                        </p>
                    )}
                </div>
            )}

            {stage === "password" && (
                <>
                    <InputWithError
                        type="password"
                        placeholder="Enter your new password"
                        className="py-6 px-4 w-full"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <InputWithError
                        type="password"
                        placeholder="Confirm your new password"
                        className="py-6 px-4 w-full"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />
                </>
            )}

            <div className="flex items-center justify-between">
                {stage === "otp" ? (
                    <Button
                        type="button"
                        className="py-2 px-8 rounded bg-black hover:bg-gray-800 text-sm text-white"
                        onClick={handleResendCode}
                        disabled={isResendVerificationCodeLoading}
                    >
                        Resend Code
                    </Button>
                ) : (
                    <div className="float-right" />
                )}

                <ButtonWithLoading
                    isLoading={isButtonLoading()}
                    type="button"
                    disabled={isButtonLoading()}
                    onClick={handleSubmitClick}
                    className="py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right"
                >
                    {getButtonText()}
                </ButtonWithLoading>
            </div>
        </form>
    );
};

export default memo(ForgetPasswordForm);