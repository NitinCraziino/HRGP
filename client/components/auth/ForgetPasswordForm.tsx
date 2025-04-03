"use client";

import { useEffect, useState } from "react";
import { InputWithError } from "../ui/input";
import ButtonWithLoading from "../ButtonWithLoading";

const ForgetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [email, setEmail] = useState("");
    const [isMailSent, setIsMailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpExpiryTime, setOtpExpiryTime] = useState(60);

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

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (!email) {
                setEmailError("Email is required");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Invalid email address");
                return;
            }

            setIsLoading(true);
            // TODO: Send email to user
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsMailSent(true);
        } catch (error: any) {
            setEmailError(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }

    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
        setOtpError("");
    };


    return (
        <form className="space-y-4 w-full">
            <InputWithError
                type="email"
                placeholder="Enter your email"
                className="py-6 px-4 w-full"
                value={email}
                error={emailError}
                onChange={handleEmailChange}
            />

            {isMailSent && (
                <div>
                    <InputWithError
                        type="otp"
                        placeholder="Enter the verification code"
                        className="py-6 px-4 w-full"
                        value={otp}
                        error={otpError}
                        onChange={handleOtpChange}
                    />
                    <p className="text-sm text-gray-500">
                        Verification code will expire in {otpExpiryTime} seconds
                    </p>
                </div>
            )}

            <ButtonWithLoading
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right min-w-[100px]"
            >
                Submit
            </ButtonWithLoading>
        </form>
    );
};

export default ForgetPasswordForm;