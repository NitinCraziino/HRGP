import { memo } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import LinkedinAuthButton from "./LinkedinAuthButton";

const OAuthButtons = ({ isSignIn }: { isSignIn: boolean; }) => {
    return (
        <div className="flex flex-col gap-4 mb-5">
            <GoogleAuthButton isSignIn={isSignIn} />
            <LinkedinAuthButton isSignIn={isSignIn} />
        </div>
    );
};

export default memo(OAuthButtons);