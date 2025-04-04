import Image from "next/image";
import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import { memo } from "react";
import WithoutAuth from "@/components/hoc/WithoutAuth";
import PublicPageContainer from "@/components/hoc/PublicPageContainer";

const ForgetPassword = () => {
    return (
        <WithoutAuth>
            <div className="container h-full py-[20px] sm:py-24 flex items-center px-4 md:px-8">
                <PublicPageContainer className="mx-auto max-w-6xl w-full">
                    <div className="grid md:grid-cols-2 gap-8 items-center ml-20">
                        {/* Left side - Image */}
                        <div className="hidden md:flex justify-center ">
                            <div className="relative w-full max-w-md aspect-[7/7] min-w-[600px] flex items-center justify-center">
                                <Image
                                    src="/assets/images/signin-banner.svg"
                                    alt="Office workers using ATS software"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right side - Sign-in Form */}
                        <div className="w-full max-w-md mx-auto py-[130px] ml-25" >
                            <h1 className="text-3xl font-bold text-[#0f1941] mb-6 text-center md:text-left">
                                Forgot Password
                            </h1>
                            <ForgetPasswordForm />
                        </div>
                    </div>
                </PublicPageContainer>
            </div>
        </WithoutAuth>
    );
};

export default memo(ForgetPassword);