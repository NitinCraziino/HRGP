'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
const GoogleAuthButton = ({ isSignIn }: { isSignIn: boolean; }) => {

    const handleGoogleSignIn = () => {
        console.log('Google sign in');
    };

    const handleGoogleSignUp = () => {
        console.log('Google sign up');
    };

    return (
        <Button
            variant="outline"
            className="w-full cursor-pointer bg-sidebar shadow-md min-h-[50px] transition-all flex items-center gap-2"
            onClick={isSignIn ? handleGoogleSignIn : handleGoogleSignUp}
        >
            <Image src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
            {isSignIn ? 'Sign in with Google' : 'Sign up with Google'}
        </Button>
    );
};

export default GoogleAuthButton;