'use client';

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useIsPublicRoutes from "@/hooks/useIsPublicRoutes";
const NavBar = () => {
    const pathname = usePathname();
    const showLinks = pathname !== '/signin';
    const isPublicRoute = useIsPublicRoutes();
    if (!isPublicRoute) return null;
    return (
        <header className="bg-white border-b py-1 px-2 md:px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/assets/images/hrgp-logo.png"
                            alt="Hire and Retain Logo"
                            width={100}
                            height={61.9}
                        />
                    </Link>
                    {showLinks && (
                        <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
                            <div className="relative group">
                                <button className="flex items-center gap-0.5 text-gray-700 hover:text-blue-600 text-xs font-medium">
                                    ABOUT <ChevronDown className="h-3 w-3" />
                                </button>
                            </div>
                            <Link href="/blogs" className="text-gray-700 hover:text-blue-600 text-xs font-medium">
                                BLOGS
                            </Link>
                            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 text-xs font-medium">
                                PRICING
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-blue-600 text-xs font-medium">
                                CONTACT
                            </Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;