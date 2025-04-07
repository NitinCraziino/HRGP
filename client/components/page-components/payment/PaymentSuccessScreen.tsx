"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PaymentSuccessScreenProps {
    redirectDelay?: number;
}

const PaymentSuccessScreen = ({ redirectDelay = 4000 }: PaymentSuccessScreenProps) => {
    const router = useRouter();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            // router.push("/signin");
        }, redirectDelay);

        return () => clearTimeout(redirectTimer);
    }, [router, redirectDelay]);

    return (
        <div className="flex-grow flex flex-col items-center justify-center px-4 font-bold mt-36" >
            <div className="rounded-full bg-green-500 p-4 w-20 h-20 flex items-center justify-center mb-8">
                <svg className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h1 className="text-4xl  mb-2">Welcome to HRGP! 🎉</h1>
            <p className="text-3xl  mb-6">Your 30-day free trial is now active.</p>

            <div className="mb-8 text-center">
                <div className="flex items-center justify-center mb-2">
                    <div className="mx-2 text-green-500 text-2xl">
                        ✅
                    </div>
                    <span className="text-2xl" >Next Steps:</span>
                </div>

                <ul className="space-y-1 text-center font-normal list-disc list-inside">
                    <li className="flex items-center justify-center">
                        <span className="mr-2">•</span>
                        <span>Log in to your dashboard to explore features.</span>
                    </li>
                    <li className="flex items-center justify-center">
                        <span className="mr-2">•</span>
                        <span>Access our Quick Start Guide in Help for tips to get started.</span>
                    </li>
                    <li className="flex items-center justify-center">
                        <span className="mr-2">•</span>
                        <span>Need help? Reach out anytime via support@hrgp.io.</span>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default PaymentSuccessScreen

