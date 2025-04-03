'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { authRoutes } from '@/config/api';

const GoogleAuthButton = ({ isSignIn }: { isSignIn: boolean; }) => {

    const handleGoogleSignUp = async () => {
        try {
            window.location.href = authRoutes.google;
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <Button
            variant="outline"
            className="w-full cursor-pointer bg-sidebar shadow-md min-h-[50px] transition-all flex items-center gap-2"
            onClick={handleGoogleSignUp}
        >
            <Image src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
            {isSignIn ? 'Sign in with Google' : 'Sign up with Google'}
        </Button>
    );
};

export default GoogleAuthButton;