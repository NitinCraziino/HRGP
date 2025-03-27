import Image from "next/image";
import SigninForm from "@/components/auth/SigninForm";
import { memo } from "react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import Container from "@/components/Container";

const Signin = () => {
    return (
        <div className="container h-full py-[20px] sm:py-24 flex items-center px-4 md:px-8">
            <Container className="mx-auto max-w-6xl w-full">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left side - Image */}
                    <div className="hidden md:flex justify-center">
                        <div className="relative w-full max-w-md aspect-[5/6] flex items-center justify-center">
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
                    <div className="w-full max-w-md mx-auto py-[120px]" >
                        <h1 className="text-3xl font-bold text-[#0f1941] mb-6 text-center md:text-left">
                            Welcome Back!
                        </h1>
                        <OAuthButtons isSignIn={true} />
                        <SigninForm />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default memo(Signin);