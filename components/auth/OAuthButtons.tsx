import GoogleAuthButton from "./GoogleAuthButton";

const OAuthButtons = ({ isSignIn }: { isSignIn: boolean; }) => {
    return (
        <div className="flex flex-col gap-4 mb-5">
            <GoogleAuthButton isSignIn={isSignIn} />
        </div>
    );
};

export default OAuthButtons;