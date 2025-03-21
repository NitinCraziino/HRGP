import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t py-4 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 text-center">
                <div className="mb-2 md:mb-0">
                    © 2008 - 2023 All rights reserved. | Guided Hiring® is a registered trademark of Hire and Retain Good People LLC
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 md:mt-0">
                    <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms & Conditions
                    </Link>
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
