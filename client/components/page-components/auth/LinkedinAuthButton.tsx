'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const LinkedinAuthButton = ({ isSignIn }: { isSignIn: boolean; }) => {

    const handleLinkedinSignIn = () => {
        console.log('Linkedin sign in');
    };

    const handleLinkedinSignUp = () => {
        console.log('Linkedin sign up');
    };

    return (
        <Button
            variant="outline"
            className="w-full cursor-pointer shadow-md min-h-[50px] transition-all flex items-center gap-2 bg-[#0077B5] text-white hover:bg-[#005582] hover:text-white"
            onClick={isSignIn ? handleLinkedinSignIn : handleLinkedinSignUp}
        >
            <Image src="/assets/icons/linkedin.svg" className='rounded-sm' alt="Linkedin" width={24} height={24} />
            {isSignIn ? 'Sign in with Linkedin' : 'Sign up with Linkedin'}
        </Button>
    );
};

export default LinkedinAuthButton;