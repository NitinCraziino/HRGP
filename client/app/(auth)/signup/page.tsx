import Image from "next/image";
import { memo } from "react";
import SignupForm from "@/components/auth/SignupForm";
import OAuthButtons from "@/components/auth/OAuthButtons";
import WithoutAuth from "@/components/hoc/WithoutAuth";

const Signup = () => {
    return (
        <WithoutAuth>
            <div className="flex justify-center items-center px-8 lg:px-32 py-20 md:py-40 ">
                <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full ">
                    {/* Left Side - Image (Hidden on Small Screens) */}
                    <div className="hidden lg:flex w-1/2 justify-center md:mr-10">
                        <Image
                            src="/assets/images/signup-banner.png"
                            alt="Signup Banner"
                            className="w-full max-w-[600px] h-auto object-contain"
                            width={600}
                            height={500}
                            priority
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="max-w-md w-full">
                            <h1 className="text-3xl font-bold mb-6 text-center">FREE 30-DAY TRIAL</h1>
                            <OAuthButtons isSignIn={false} />
                            <SignupForm />
                        </div>
                    </div>

                </div>
            </div>
        </WithoutAuth>
    );
};

export default memo(Signup);
